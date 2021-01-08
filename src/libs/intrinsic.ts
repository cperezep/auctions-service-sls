import { findKey } from 'lodash';
import { CloudFormationResources, CloudFormationResource } from 'src/models/cloudFormationResources.model';

interface CloudFormationReference {
  Ref: string;
}

export const ref = (
  resources: CloudFormationResources,
  referencedResource: CloudFormationResource,
): CloudFormationReference => {
  return {
    Ref: findKey(resources, (resource) => referencedResource === resource),
  };
};
