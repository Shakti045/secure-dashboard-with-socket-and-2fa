'use client'

import { io } from 'socket.io-client';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
export const socket = io(backendUrl);