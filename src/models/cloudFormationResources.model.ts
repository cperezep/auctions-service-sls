export interface CloudFormationResources {
  [k: string]: CloudFormationResource;
}

export interface CloudFormationResource {
  Type: string;
  Properties?: {
    [k: string]: unknown;
  };
}
