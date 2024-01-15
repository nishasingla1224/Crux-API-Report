import { AlertProps } from "@mui/material";

export interface InfoBlockComponentProps {
  infoType: AlertProps["severity"];
  message: string;
}
