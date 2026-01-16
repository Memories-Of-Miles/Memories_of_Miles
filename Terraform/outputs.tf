output "alb_dns_name" {
  description = "Access backend via ALB"
  value       = aws_lb.alb.dns_name
}

output "ec2_private_ip" {
  description = "Backend EC2 private IP"
  value       = aws_instance.memoriesofmiles_backend.private_ip
}
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.memoriesofmiles_vpc.id
}
output "public_subnet_ids" {
  description = "Public Subnet IDs"
  value       = [aws_subnet.public_1.id, aws_subnet.public_2.id]
}
output "private_subnet_id" {
  description = "Private Subnet ID"
  value       = aws_subnet.private.id
}
output "nat_gateway_id" {
  description = "NAT Gateway ID"
  value       = aws_nat_gateway.nat.id
}
output "ec2_instance_id" {
  description = "Backend EC2 Instance ID"
  value       = aws_instance.memoriesofmiles_backend.id
}
output "alb_security_group_id" {
  description = "ALB Security Group ID"
  value       = aws_security_group.alb_sg.id
}
output "ec2_security_group_id" {
  description = "EC2 Security Group ID"
  value       = aws_security_group.ec2_sg.id
}
output "alb_arn" {
  description = "ALB ARN"
  value       = aws_lb.alb.arn
}
output "target_group_arn" {
  description = "ALB Target Group ARN"
  value       = aws_lb_target_group.tg.arn
}
output "alb_listener_arn" {
  description = "ALB Listener ARN"
  value       = aws_lb_listener.listener.arn
}
output "ec2_ami" {
  description = "AMI ID used for EC2 Instance"
  value       = aws_instance.memoriesofmiles_backend.ami
}
output "ec2_instance_type" {
  description = "EC2 Instance Type"
  value       = aws_instance.memoriesofmiles_backend.instance_type
}
output "ec2_key_name" {
  description = "Key Pair Name for EC2 Instance"
  value       = aws_instance.memoriesofmiles_backend.key_name
}
output "app_port" {
  description = "Application Port"
  value       = var.app_port
}
output "aws_region" {
  description = "AWS Region"
  value       = var.aws_region
}
output "environment" {
  description = "Deployment Environment"
  value       = var.environment
}
output "instance_private_ip" {
  description = "Private IP of the EC2 Instance"
  value       = aws_instance.memoriesofmiles_backend.private_ip
}
output "instance_public_ip" {
  description = "Public IP of the EC2 Instance"
  value       = aws_instance.memoriesofmiles_backend.public_ip
}

output "instance_tags" {
  description = "Tags associated with the EC2 Instance"
  value       = aws_instance.memoriesofmiles_backend.tags
}
