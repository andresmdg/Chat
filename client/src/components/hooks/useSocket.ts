import { SocketContext } from "@/context/SockeContext";
import { useContext } from "react";

export const useSocket = () => useContext(SocketContext);