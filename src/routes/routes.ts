import { SignUp } from "../components/auth/SignUp";
import Test from "../components/Test";

export const routes = [
  {
    path: '/',
    element: 'Home',
  },
  {
    path: '/counter',
    element: 'Counter',
    component: Test
  },
  {
    path: '/signup',
    element: 'Sign Up',
    component: SignUp
  }
] as const;