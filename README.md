# 👾 QRLS v2

QRLS (Questionable Research Labs Sign-on) v2

![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)

This is the new application for Questionable Research Labs which is both a sign-in kiosk and a manager for the current
day attendance.

This is the second version which the creation of has become pessary due to the new "Traffic Light" system being
implemented across NZ this new version implements vaccine pass verification and scanning

This version is no longer dependent on google sheets it instead has its own MongoDB database which
is used to store the verified members

## 📦 Docker

This application comes with a Dockerfile and docker-compose.yml
(If using docker you can ignore Setup)
There is also a captain-definition so that it can be deployed to a CapRover server

## ⚙️ Setup

This new version is intended to be setup via docker only as it's a multi stage setup process

## 📝 Environment

The following environment variables are required to run

| Variable     | Example                        | Explanation                           |
|--------------|--------------------------------|---------------------------------------|
| DATABASE_URL | mongodb://localhost:27017/qrls | The port in which the app will run on |
| ADMIN_PASSWORD |  | The password used to access the administrative menu |
