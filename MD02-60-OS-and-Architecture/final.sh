#   Immanuella Busari
#   Lecture 3

#	Create a new folder and file
mkdir "Cars"
touch "Cars/opel.txt"
echo "Opel text file was created"

#   Make the file read-only
chmod 0444 "Cars/opel.txt"

#   Delete the file without asking for confirmation
rm -f "Cars/opel.txt"

#   Delete the directory in case you want to re-run the script
rm -d "Cars"

#   Tell
echo "We removed opel.txt file (and the parent directory) without asking for permission"
