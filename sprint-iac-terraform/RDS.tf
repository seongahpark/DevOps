## rds subnet group
resource "aws_db_subnet_group" "seongah-db-subnet" {
  name = "seongah-db-subnet"
  subnet_ids = [ aws_subnet.private-subnet-1.id, aws_subnet.private-subnet-2.id ]

  tags = {
      Name = "seongah-db-subnet"
  }
}

## rds instance
resource "aws_db_instance" "seongah-rds" {
  allocated_storage = 10
  engine = "mysql"
  engine_version = 5.7
  instance_class = "db.t2.micro"
  name = "seongahrds"
  username = "admin"
  password = var.rds_password
  db_subnet_group_name = aws_db_subnet_group.seongah-db-subnet.name
  parameter_group_name = "default.mysql5.7"
  skip_final_snapshot = true
  availability_zone = "ap-northeast-2b"
  vpc_security_group_ids = [ aws_security_group.db-sg.id ]

  tags = {
      Name = "seongah-rds"
  }
}

