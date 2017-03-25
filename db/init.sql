CREATE TABLE streets (
	lat float,
	lng float,
	full_address text PRIMARY KEY,
	street_number varchar(25),
	street_name varchar(50),
	city varchar(30),
	state varchar(30),
	sweep_hour_start1 integer,
	sweep_hour_end1 integer,
	sweep_day1 integer,
	sweep_week1 integer,
	sweep_hour_start2 integer,
	sweep_hour_end2 integer,
	sweep_day2 integer,
	sweep_week2 integer
);
