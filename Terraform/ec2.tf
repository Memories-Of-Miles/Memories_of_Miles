# EC2 Instance for Backend Application

resource "aws_instance" "memoriesofmiles_backend" {
  ami                    = "ami-02b8269d5e85954ef" # Ubuntu 
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.private.id
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  tags ={
    Name        = "memoriesofmiles-backend-${var.environment}"
    Environment = var.environment
  }
  
  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install -y nginx
              systemctl start nginx
              systemctl enable nginx
              EOF
}

resource "aws_lb_target_group_attachment" "attach" {
  target_group_arn = aws_lb_target_group.tg.arn
  target_id        = aws_instance.memoriesofmiles_backend.id
  port             = 80
}
