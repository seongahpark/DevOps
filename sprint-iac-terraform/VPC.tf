resource "aws_vpc" "seongah-vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "seongah-vpc"
  }
}

resource "aws_subnet" "public-subnet-1" {
  vpc_id = aws_vpc.seongah-vpc.id
  cidr_block = "10.0.0.0/24"
  availability_zone = "ap-northeast-2a"
  tags = {
    "Name" = "public-subnet-1"
  }
}

resource "aws_subnet" "private-subnet-1" {
  vpc_id = aws_vpc.seongah-vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "ap-northeast-2a"
  tags = {
    "Name" = "private-subnet-1"
  }
}

resource "aws_subnet" "public-subnet-2" {
  vpc_id = aws_vpc.seongah-vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "ap-northeast-2b"
  tags = {
    "Name" = "public-subnet-2"
  }
}

resource "aws_subnet" "private-subnet-2" {
  vpc_id = aws_vpc.seongah-vpc.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "ap-northeast-2b"
  tags = {
    "Name" = "private-subnet-2"
  }
}

## igw
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.seongah-vpc.id

  tags = {
    Name = "seongah-igw"
  }
}

## eip (Elastic IP)
resource "aws_eip" "ngw-eip" {
  vpc = true
}

## ngw
resource "aws_nat_gateway" "ngw" {
  allocation_id = aws_eip.ngw-eip.id
  subnet_id = aws_subnet.public-subnet-1.id

  tags = {
    Name = "seongah-ngw"
  }
}

## Routing Table
resource "aws_route_table" "public-rt" {
  vpc_id = aws_vpc.seongah-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public-rt"
  }
}

resource "aws_route_table" "private-rt1" {
  vpc_id = aws_vpc.seongah-vpc.id

  tags = {
    Name = "private-rt1"
  }
}

resource "aws_route_table" "private-rt2" {
  vpc_id = aws_vpc.seongah-vpc.id

  tags = {
    Name = "private-rt2"
  }
}

## Route Table - Subnet Association
resource "aws_route_table_association" "public1-subnet-rt" {
  subnet_id = aws_subnet.public-subnet-1.id
  route_table_id = aws_route_table.public-rt.id
}

resource "aws_route_table_association" "public2-subnet-rt" {
  subnet_id = aws_subnet.public-subnet-2.id
  route_table_id = aws_route_table.public-rt.id
}

resource "aws_route_table_association" "private1-subnet-rt" {
  subnet_id = aws_subnet.private-subnet-1.id
  route_table_id = aws_route_table.private-rt1.id
}

resource "aws_route_table_association" "private2-subnet-rt" {
  subnet_id = aws_subnet.private-subnet-2.id
  route_table_id = aws_route_table.private-rt2.id
}

## 보안 그룹
resource "aws_security_group" "public-sg" {
  name = "public-sg"
  description = "Allow TLS inbound traffic"
  vpc_id = aws_vpc.seongah-vpc.id

  # 인바운드 규칙
  ingress = [
    {
      description ="FOR HTTP"
      from_port = 80
      to_port = 80
      protocol = "tcp"
      security_groups = []
      self = false
      prefix_list_ids = []
      cidr_blocks = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description = "FOR SSH"
      from_port = 22
      to_port = 22
      protocol = "tcp"
      security_groups = []
      self = false
      prefix_list_ids = []
      cidr_blocks = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    }
  ]

  # 아웃바운드 규칙
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" = "public-sg"
  }
}

resource "aws_security_group" "db-sg" {
  name = "db-sg"
  description = "Allow DB inbound traffic"
  vpc_id = aws_vpc.seongah-vpc.id

  # 인바운드 규칙
  ingress {
      description = "FOR MYSQL"
      from_port = 3306
      to_port = 3306
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
  }

  # 아웃바운드 규칙
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Name" = "db-sg"
  }
}