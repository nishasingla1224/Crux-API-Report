import Alert from "@mui/material/Alert";
import { InfoBlockComponentProps } from "./types";

export default function InfoBlock({
  infoType,
  message,
}: InfoBlockComponentProps) {
  return (
    <Alert severity={infoType} className="mt10">
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </Alert>
  );
}
