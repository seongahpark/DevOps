# resource "aws_instance" "seongah-ec2" {
#   count = 2
#   ami = "ami-0ed11f3863410c386"
#   instance_type = "t2.micro"
#   key_name = "seongah-key"
#   associate_public_ip_address = true
#   vpc_security_group_ids = [ aws_security_group.public-sg ]
#   user_data = file(user_data)

#   tags = {
#     Name = "seongah-ec2-server"
#   }
# }

resource "aws_launch_template" "seongah-template" {
    name = "seongah-template"

    block_device_mappings {
      device_name = "/dev/sda1"

      ebs {
          volume_size = 8
      }
    }

    ebs_optimized = false
    image_id = "ami-0ed11f3863410c386"
    instance_initiated_shutdown_behavior = "terminate"
    instance_type = "t2.micro"
    key_name = "seongahkey"
    network_interfaces {
      associate_public_ip_address = true
      subnet_id = aws_subnet.public-subnet-1.id
      security_groups = [ aws_security_group.public-sg.id ]
    }
    placement {
      availability_zone = "ap-northeast-2a"
    }
    tag_specifications {
      resource_type = "instance"

      tags = {
        Name = "seongah-template"
     } 
    }

    user_data = filebase64("./user_data.sh")
}