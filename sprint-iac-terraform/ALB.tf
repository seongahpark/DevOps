resource "aws_lb" "seongah-alb" {
  name = "seongah-alb"
  internal = false
  load_balancer_type = "application"
  security_groups = [ aws_security_group.public-sg.id ]
  subnets = [ aws_subnet.public-subnet-1.id, aws_subnet.public-subnet-2.id ]

  tags = {
      Environment = "production"
  }
}

resource "aws_lb_target_group" "seongah-alb-tg" {
    name = "seongah-alb-tg"
    port = 80
    protocol = "HTTP"
    vpc_id = aws_vpc.seongah-vpc.id
}

resource "aws_lb_listener" "seongah-alb-listener" {
  load_balancer_arn = aws_lb.seongah-alb.arn
  port = 80
  protocol = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.seongah-alb-tg.arn
  }
}