import { abjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * abjectives.length);
  return `${abjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "bolonge@bolonggram.com",
    to: adress,
    subject: "Login Secret for Bolonggram",
    html: `Hello! your login secret is <strong>${secret}</strong> <br/> Copy Paste on app/website to log in`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
