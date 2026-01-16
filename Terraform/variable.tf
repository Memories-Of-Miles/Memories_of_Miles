variable "aws_region" {
  default = "ap-south-1"
}

variable "environment" {
  default = "dev"
}

variable "vpc_cidr" {}
variable "public_subnet_cidr_1" {}
variable "public_subnet_cidr_2" {}
variable "private_subnet_cidr" {}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {}

variable "app_port" {
  default = 80
}
