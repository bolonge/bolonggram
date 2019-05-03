import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    comfirmSecret: async (_, args) => {
      const { secret, email } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        return generateToken(user.id);
      } else {
        throw Error("wrong email/secret combination");
      }
    }
  }
};
