import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGO_URL!, {} as ConnectOptions).then(
    () => console.log("Connected successfully"),
    (error: any) => console.log(error)
  );
};
