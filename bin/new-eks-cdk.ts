#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { NewEksCdkStack } from '../lib/new-eks-cdk-stack';

const app = new cdk.App();
new NewEksCdkStack(app, 'NewEksCdkStack');
