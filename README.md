# Blaise User Backup

[![codecov](https://codecov.io/gh/ONSdigital/blaise-user-backup/branch/main/graph/badge.svg)](https://codecov.io/gh/ONSdigital/blaise-user-backup)
[![CI status](https://github.com/ONSdigital/blaise-user-backup/workflows/Test%20coverage%20report/badge.svg)](https://github.com/ONSdigital/blaise-user-backup/workflows/Test%20coverage%20report/badge.svg)
<img src="https://img.shields.io/github/release/ONSdigital/blaise-user-backup.svg?style=flat-square" alt="Nisra Case Mover release verison">
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/ONSdigital/blaise-user-backup.svg)](https://github.com/ONSdigital/blaise-user-backup/pulls)
[![Github last commit](https://img.shields.io/github/last-commit/ONSdigital/blaise-user-backup.svg)](https://github.com/ONSdigital/blaise-user-backup/commits)
[![Github contributors](https://img.shields.io/github/contributors/ONSdigital/blaise-user-backup.svg)](https://github.com/ONSdigital/blaise-user-backup/graphs/contributors)


## **POC** - Not currently in use. Currently, using [blaise-user-backup-pipeline](https://github.com/ONSdigital/blaise-user-backup-pipeline) instead 



Backup users and roles into a GCP Bucket as JSON files.

This service connects to the [Blaise Rest API](https://github.com/ONSdigital/blaise-api-rest) to obtain the current user accounts and user roles then stores this data into a JSON file in a GCP Bucket.

### Deploying to an GCP environment

To deploy the cloud function to an environment run the following command, Changing the `--set-env-vars` values for your environment: 

```shell
gcloud functions deploy blaise-user-backup --entry-point backup \
--runtime nodejs12 --trigger-http --vpc-connector vpcconnect --region europe-west2\
 --set-env-vars BLAISE_API_URL=restapi.europe-west2-a.c.ons-blaise-dev-matt55.internal:90,BUCKET_NAME=ons-blaise-dev-matt55-files,PROJECT_ID=ons-blaise-dev-matt55
```

### Setup locally
Clone the Repo
```shell script
git clone https://github.com/ONSdigital/blaise-user-backup.git
```

Create a new .env file and add the following variables.

| Variable                      | Description                                                                     | Var Example                  |
|-------------------------------|---------------------------------------------------------------------------------|------------------------------|
| BLAISE_API_URL                | Url that the [Blaise Rest API](https://github.com/ONSdigital/blaise-api-rest) is running on to send calls to. | localhost:90 |
| PROJECT_ID                    | GCP Project ID                                                                  | ons-blaise-dev-matt55        |
| BUCKET_NAME                   | GCP Bucket name for the JSOn files to be put in                                 | ons-blaise-dev-matt55-files  |


The .env file should be setup as below
```.env
BLAISE_INSTRUMENT_CHECKER_URL=localhost:90
PROJECT_ID=ons-blaise-dev-matt55
BUCKET_NAME=ons-blaise-dev-matt55-files
```

Install required modules
```shell script
npm install
```

#### Local access to GCP Bucket

To get the service working locally with a remote GCP Bucket, you need to [obtain a JSON service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys), this will need to a service account with create and list permissions to the specified bucket. 

Save the service account key as  `keys.json` and place in the root of the project. Providing the NODE_ENV is not production, then the GCP storage config (Found at `server/index.js`) will attempt to use this file. 

**DO NOT COMMIT THIS FILE**

### Run locally commands

To run this locally using the [Functions Framework](https://github.com/GoogleCloudPlatform/functions-framework-nodejs), run the following command.
```shell
npm run start
```

This will start run on port `8080`. To start the function by heading to [localhost:8080](http://localhost:8080/). When complete this will tell you whether it was successful or not. 
```html
Finished. backupUsers: Successful, backupRoles: Successful
```
