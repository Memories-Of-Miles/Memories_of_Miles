############################################
# Terraform Root Configuration
############################################

# This file serves as the root entry point.
# Resources are split into logical files:
# - vpc.tf              → Networking
# - security_groups.tf  → Security
# - alb.tf              → Load Balancer
# - ec2.tf              → Compute
# - outputs.tf          → Outputs

# Terraform automatically loads all .tf files
############################################
