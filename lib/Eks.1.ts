import cdk = require('@aws-cdk/core');
import eks = require('@aws-cdk/aws-eks');
import iam = require('@aws-cdk/aws-iam');

import { Vpc, InstanceType } from '@aws-cdk/aws-ec2';


export class Eks1 extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // The code that defines your stack goes here
    const vpc = Vpc.fromLookup(this, 'defaultstack/defaultvpc', {
      isDefault: false
    })

    const clusterAdmin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    const cluster = new eks.Cluster(this,  'eksCluster2', {
      vpc,
      mastersRole: clusterAdmin
    })
    // cluster.addCapacity('Spot', {
    //   maxCapacity: 1,
    //   spotPrice: '0.24',
    //   instanceType: new InstanceType('t3.large'),
    //   bootstrapOptions: {
    //     kubeletExtraArgs: '--node-labels foo=bar'
    //   },
    // })

    const appLabel = { app: "hello-kubernetes" };

    const deployment = {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: { name: "hello-kubernetes" },
      spec: {
        replicas: 3,
        selector: { matchLabels: appLabel },
        template: {
          metadata: { labels: appLabel },
          spec: {
            containers: [
              {
                name: "hello-kubernetes",
                image: "amazon/amazon-ecs-sample:latest",
                ports: [{ containerPort: 80 }]
              }
            ]
          }
        }
      }
    };

    const service = {
      apiVersion: "v1",
      kind: "Service",
      metadata: { name: "hello-kubernetes" },
      spec: {
        type: "LoadBalancer",
        ports: [{ port: 80, targetPort: 80 }],
        selector: appLabel
      }
    };

    cluster.addResource('hello-kub', service, deployment);

  }
}
