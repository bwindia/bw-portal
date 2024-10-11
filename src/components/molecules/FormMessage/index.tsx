import { Message } from "@/utils/types";

const FormMessage = ({ message }: { message: Message }) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-success border-l-2 border-success px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-danger border-l-2 border-danger px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 px-4">{message.message}</div>
      )}
    </div>
  );
}

export default FormMessage
