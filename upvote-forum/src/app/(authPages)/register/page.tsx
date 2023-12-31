"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Env from "@/config/env";
import { Backend_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
  }, [status]);

  const [authState, setAuthState] = useState<AuthStateType>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
  });
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

const submit = async (event: React.FormEvent) => {
  event.preventDefault();
  // validate the form

  if (!authState.name) {
    setErrors({ ...errors, name: "Name is required" });
    return;
  }
  if (!authState.username) {
    setErrors({ ...errors, username: "Username is required" });
    return;
  }
  if (!authState.email) {
    setErrors({ ...errors, email: "Email is required" });
    return;
  }
  if (!authState.password) {
    setErrors({ ...errors, password: "Password is required" });
    return;
  }
  if (!authState.password_confirmation) {
    setErrors({
      ...errors,
      password_confirmation: "Password confirmation is required",
    });
    return;
  }
  if (authState.password !== authState.password_confirmation) {
    setErrors({
      ...errors,
      password_confirmation: "Password and confirm password must be same",
    });
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(Backend_URL + "/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authState)
    });
    const response = await res.json();
    setLoading(false);
    if (response.status == 400) {
      setErrors(response.errors);
    } else if (response.status == 200) {
      router.push(`/login?message=${response.message}`);
    }
  } catch (err) {
    setLoading(false);
    console.log("The error is", err);
  }
};

  return (
    <div className="bg-background">
      <div className=" h-screen w-screen flex justify-center items-center">
        <div className="w-full lg:w-1/3 bg-muted p-6 rounded-lg">
          <div className="flex justify-center invert dark:invert-0">
            <Image src="/images/logo.svg" width={40} height={40} alt="Logo" />
          </div>
          <form onSubmit={submit}>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold">Register</h1>
                  <p>Welcome to the UpVote</p>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Type your name.."
                  onChange={(event) =>
                    setAuthState({ ...authState, name: event.target.value })
                  }
                />
                <span className="text-red-400 font-bold">{errors.name}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Type your unique username"
                  onChange={(event) =>
                    setAuthState({ ...authState, username: event.target.value })
                  }
                />
                <span className="text-red-400 font-bold">
                  {errors.username}
                </span>
              </div>
              <div className="mt-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Type your email.."
                  onChange={(event) =>
                    setAuthState({ ...authState, email: event.target.value })
                  }
                />
                <span className="text-red-400 font-bold">{errors.email}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Type your password.."
                  onChange={(event) =>
                    setAuthState({ ...authState, password: event.target.value })
                  }
                />
                <span className="text-red-400 font-bold">
                  {errors.password}
                </span>
              </div>
              <div className="mt-5">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="cpassword"
                  placeholder="Confirm password.."
                  onChange={(event) =>
                    setAuthState({
                      ...authState,
                      password_confirmation: event.target.value,
                    })
                  }
                />
                   <span className="text-red-400 font-bold">
                  {errors.password_confirmation} 
                </span>
              </div>
              <div className="mt-5">
                <Button className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Register"}
                </Button>
              </div>
              <div className="mt-5">
                <span>Already Have an account ? </span>
                <Link href="/login" className="text-orange-600 font-bold">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
