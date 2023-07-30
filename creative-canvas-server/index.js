const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)

const port = process.env.PORT || 5000

// middleware
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())



const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
    })
}




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const uri = `mongodb+srv://creativeCanvas:creativeCanvas123@cluster0.fgnllqp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

async function run() {
    try {
        const allCoursesAndInstructorsCollection = client.db('creativeCanvasDB').collection('allCoursesAndInstructors');
        const classesCollection = client.db('creativeCanvasDB').collection('classes');
        const usersCollection = client.db('creativeCanvasDB').collection('users');
        const selectedClassesCollection = client.db('creativeCanvasDB').collection('selectedClasses');
        const paymentsCollection = client.db('creativeCanvasDB').collection('payments');

        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
            res.send(token)
        })





        //user 
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });


        app.post('/users', async (req, res) => {
            const user = req.body;

            const query = { email: user.email }
            const existingUser = await usersCollection.findOne(query);

            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.patch('/users/admin/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: 'admin'
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc)
            res.send(result);

        })

        app.patch('/users/instructor/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    role: 'instructor'
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        //homepage apis
        app.get('/classes', async (req, res) => {
            const result = await allCoursesAndInstructorsCollection
                .find({})
                .sort({ numbersofstuds: -1 })
                .limit(6)
                .toArray();

            res.send(result);
        });
        app.get('/instructors', async (req, res) => {
            const result = await allCoursesAndInstructorsCollection
                .find({})
                .sort({ studentsEnrolled: -1 })
                .limit(6)
                .toArray();

            res.send(result);
        });
        app.get('/allInstructors', async (req, res) => {
            const result = await allCoursesAndInstructorsCollection
                .find({})
                .toArray();

            res.send(result);
        });

        // classes page api
        app.get('/allClasses', async (req, res) => {
            const result = await classesCollection
                .find({})
                .toArray();

            res.send(result);
        });

        app.post('/allClasses', async (req, res) => {
            const newItem = req.body;
            const result = await classesCollection.insertOne(newItem);
            res.send(result)
        })

        //selected classes api
        app.get('/selectedClasses', async (req, res) => {
            const email = req.query.email;
            if (!email) {
                return res.send([]);
            }

            const query = { email: email };
            const result = await selectedClassesCollection.find(query).toArray();
            res.send(result);
        });

        app.post('/selectedClasses', async (req, res) => {
            const classes = req.body;
            const result = await selectedClassesCollection.insertOne(classes);
            res.send(result);
        })

        app.get('/myClasses', async (req, res) => {
            let query = {};

            if (req.query?.instructor_email) {
                query = {
                    instructor_email: req.query.instructor_email
                }
            }
            const result = await classesCollection.find(query).toArray();
            res.send(result)
        })

        // selectedClass delete 
        app.delete('/selectedClasses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await selectedClassesCollection.deleteOne(query);
            res.send(result);
        })




        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = price * 100;
            if (typeof amount !== 'number' || isNaN(amount) || amount < 1) {
                return res.status(400).json({ error: 'Invalid amount' });
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            })
            res.send({
                clientSecret: paymentIntent.client_secret
            })

        })

        app.get('/payments', async (req, res) => {
            const result = await paymentsCollection.find({}).toArray();
            res.send(result)
        })


        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const insertedId = await paymentsCollection.insertOne(payment);
            const query = { _id: new ObjectId(payment?.new_id) };
            const classQuery = { _id: new ObjectId(payment?.classId) };
            // console.log(classQuery);

            const classDoc = await classesCollection?.findOne(classQuery);
            const availableSeats = parseInt(classDoc?.availableSeats);
            const newAvailableSeats = availableSeats - 1;
            const studentsEnrolled = parseInt(classDoc?.studentsEnrolled);
            const newStudentsEnrolled = studentsEnrolled + 1;


            const updateResult = await classesCollection?.updateOne(
                classQuery,

                {
                    $set: {
                        availableSeats: newAvailableSeats?.toString(),
                        studentsEnrolled: newStudentsEnrolled?.toString()
                    }
                }

            );
            // console.log(updateResult);
            const deleteResult = await selectedClassesCollection.deleteOne(query)
            res.send({ insertedId, deleteResult, updateResult });
        })


        //approve and deny

        app.patch('/myClasses/manageClasses/approve/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    status: 'approved'
                }
            }
            const result = await classesCollection.updateOne(filter, updateDoc);
            res.send(result)
        })
        app.patch('/myClasses/manageClasses/deny/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const filter = { _id: new ObjectId(id) }
            const feedbackText = req.body;
            const updateDoc = {
                $set: {
                    status: 'denied',
                    feedback: feedbackText.feedbackText
                }
            }
            const result = await classesCollection.updateOne(filter, updateDoc);
            res.send(result)
        })



        app.get('/admin-stats', async (req, res) => {
            const users = await usersCollection.estimatedDocumentCount();
            const totalClasses = await classesCollection.estimatedDocumentCount();
            const enrolledClasses = await paymentsCollection.estimatedDocumentCount();

            const payments = await paymentsCollection.find().toArray();
            const revenue = payments.reduce((sum, payment) => sum + payment.price, 0)

            res.send({
                users,
                totalClasses,
                enrolledClasses,
                revenue
            })

 
        })


        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 })
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        )
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('creativeCanvas Server is running..')
})

app.listen(port, () => {
    console.log(`creativeCanvas is running on port ${port}`)
})
