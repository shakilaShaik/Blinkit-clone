import stripe from 'stripe'
import dotenv from 'dotenv'


dotenv.config()

const Stripe = stripe(process.env.STRIPE_SECRET_KEY)

export default Stripe
