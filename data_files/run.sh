#!bin/sh
#collaborated on this shell script with Ryan Green

echo "  1 2 3 4 5"

for file in small1.fasta small2.fasta small3.fasta small4.fasta small5.fasta
do 
	echo -n ${file:5:1}
	echo -n " " 
	for file2 in small1.fasta small2.fasta small3.fasta small4.fasta small5.fasta
	do
		python globalign.py $file $file2 | xargs echo -n 
		echo -n " "
	done
	echo " "
done

	
