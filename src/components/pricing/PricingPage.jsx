"use client";

import { toast } from "sonner";
import FAQ from "./FAQ";
import PricingHero from "./PricingHero";
import WhyUpgrade from "./WhyUpgrade";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import { useRazorpay } from "react-razorpay";





const plans = [
  {
    name: "Free",
    eyebrow: "For getting started",
    price: "₹0",
    period: "/month",
    description: "Everything you need to explore your AI workspace.",
    features: [
      "10 AI Blog generations",
      "Resume Q&A generation",
      "Access to basic AI features",
      "Blog history",
      "Resume history",
    ],
    limitations: ["Maximum 10 blogs", "Limited usage", "No unlimited generation"],
    action: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    eyebrow: "For ambitious creators",
    price: "₹299",
    period: "/month",
    description: "Unlimited creation and a faster path from idea to done.",
    features: [
      "Unlimited AI Blog generation",
      "Unlimited Resume Q&A",
      "Unlimited blog and resume history",
      "Full AI Assistant access",
      "Priority generation",
      "No usage limits",
    ],
    action: "Upgrade to Pro",
    popular: true,
  },
];

export default function PricingPage() {
  const { Razorpay } = useRazorpay();

  const router = useRouter()
  const idempotencyKeyRef = useRef(null);

 async function handlePlanSelection(plan) {

     if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = uuidv4();
    }
      console.log( idempotencyKeyRef.current)
    if (plan.popular===false) {
  try {
             const response = await api.post(
        "api/pass/Update-pass",
        {
          plan:plan.name
        },
        {
          headers: {
            "idempotency-Key": idempotencyKeyRef.current,
          },
        },
       
      );
      console.log(response)
      if (!response.data.success) {
        toast.error(response.data.message);
      }
      if(response.data.success){
       idempotencyKeyRef.current=null,
        router.push("/")
      }
      toast("You're on the Free plan.");
    
  } catch (error) {
   toast.error(error.response?.data?.message || "Unable to start payment.");

  }
    }else if(plan.popular){
     try {
        const response = await api.post(
        "api/pass/Update-pass",
        {
          plan:plan.name
        },
        {
          headers: {
            "idempotency-Key": idempotencyKeyRef.current,
          },
        },
       
      );

      if (!response.data.success) {
       toast.success(response.data.message);
      }

      if(response.data.success){
      const {razorpayOrderId, amount } = response.data;
          razorpaypopup(razorpayOrderId,amount);
      }
      
     } catch (error) {
      toast.error(error.response?.data?.message || "Unable to start payment.");
     }

    }
  }
 const razorpaypopup =  (razorpayOrderId,amount)=>{
   try {
      const options = {
        key: process.env.NEXT_PUBLIC_ROZARPAY_KEY_ID,
            
        amount,
        
        currency: "INR",

        name: "AIWorkspace",

        description: "Test Transaction",

        order_id: razorpayOrderId,

        handler: (response) => {
          console.log(response)
          const rozarpay_response = {
            razorpay_order_id: response.razorpay_order_id,

            razorpay_payment_id: response.razorpay_payment_id,

            razorpay_signature: response.razorpay_signature,
          };

          api
            .post("/api/pass/verifypayment", {
              rozarpay_response,
            })

            .then((res) => {
              if (res.data.success) {

                toast.success("Payment successful!");

                router.push(`/`)
                idempotencyKeyRef.current = null;
              }
            })

            .catch(() => {
              toast.error("Payment verification failed.");
            })
        },

        theme: {
          color: "#020617",
        },
        }
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
        razorpayInstance.on("payment.failed", (response) => {
        console.error("Razorpay payment failed:", response.error);
        toast.error(response.error?.description || "Payment Failed!");
      })
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-950">
      <PricingHero plans={plans} onSelect={handlePlanSelection} />
      <div className="mx-auto max-w-5xl space-y-16 px-4 pb-16 sm:space-y-20 sm:px-6 sm:pb-28">
        <WhyUpgrade />
        <FAQ />
      </div>
    </main>
  );
}
