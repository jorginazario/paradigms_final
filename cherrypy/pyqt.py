import sys
from PyQt4.QtGui import *
from PyQt4.QtCore import *

#ssh -X jnazario@student04.cse.nd.edu

class MyGUI(QMainWindow):
	def __init__(self):
		super(MyGUI, self).__init__()
		self.central = Form(parent=self)
		self.setCentralWidget(self.central)
		
		self.filemenu = self.menuBar().addMenu("File")
		fileExitAction = QAction("Exit", self)
		self.filemenu.addAction(fileExitAction)

		#connect the file to the signals
		self.connect(fileExitAction, SIGNAL("triggered()", self.exit_program))
	
	def exit_program(self):
		app.quit()
		
class Form(QDialog):
	def __init__(self, parent=None):
		super(Form, self).__init__(parent)
	
		self.image = Qimage('/img.jpeg') 
		self.imageLabel = QLabel('no image available')
		
		self.imageLabel.setAlignment(Qt.AlignCenter)
		self.imagelabel.setPixmap(QPixmap.fromImage(self.image))	
	
		self.exitbutton = QPushButton("Exit")	
		layout = QHBoxLayout()
		layout.addWidget(self.imageLabel)
		layout.addWidget(self.exitbutton)

		self.setLayout(layout)
		
		self.connect(self.exitbutton, SIGNAL("clicked()"), self.exit_program)

		def exit_program(self):
			app.quit()
	

app = QApplication(sys.argv)	#event handler (runs an infinite loop that checks if there is something in the event queue)
form = Form()

form.show()	#add event to the queue
app.exec_() #start the event queue


#NOTES:
#agent: UpButton
#event: clicked()
#handdler: onUpButtonClicked(self)
	#-send a note of 5 rating for movie
	#-bring up next recommendation
	#-get info for that next movie	/movies/mid
	#-get dating for that new movie	/ratings/mid
	#-update central widget with new movie info
#connect(self.upbutton, SigNAL("clicked()"), onUpButtonClicked)
