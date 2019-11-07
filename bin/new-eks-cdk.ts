#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { NewEksCdkStack } from '../lib/new-eks-cdk-stack';
import { Eks } from '../lib/Eks';
import { Eks1 } from '../lib/Eks.1';
import { EksNginxStack } from '../lib/eks-nginx-svc';

const env = {
    region: 'us-west-2',
    account: '374801192098'
};
// new CdkAllStack(app, 'CdkAllStack', { env });

const app = new cdk.App();
new NewEksCdkStack(app, 'NewEksCdkStack', { env });
new Eks(app, 'Eks', { env });

new Eks1(app, 'Eks1', { env });
new EksNginxStack(app, 'EksNginxStack', { env });


