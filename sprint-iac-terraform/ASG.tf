resource "aws_autoscaling_group" "seongah-asg" {
  availability_zones = [ "ap-northeast-2a" ]
  desired_capacity = 2
  min_size = 2
  max_size = 10

  launch_template {
    id = "${aws_launch_template.seongah-template.id}"
    version = "$Latest"
  }
}

resource "aws_autoscaling_attachment" "seongah-asg-attachment" {
    autoscaling_group_name = aws_autoscaling_group.seongah-asg.id
    alb_target_group_arn = aws_lb_target_group.seongah-alb-tg.arn
}