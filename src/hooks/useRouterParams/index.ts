import { useParams } from "react-router-dom";

import { RouterParams } from "@/router";

/** This is a wrapper around useParams() hook that adds types */
export const useRouterParams = () => useParams<RouterParams>();
