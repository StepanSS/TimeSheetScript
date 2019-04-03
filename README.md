# TimeSheetScript
Time Sheet Script converter

SCRIPT CONVERT DATA (from tab 'Réponses au formulaire 1')
TO 
AND PRINT DATA ON TAB 'Feuille 2'

 - You can change Tabs names on line 1 and 2 according your tabs names in your spreadsheet
 - on line 6 - 11 you can set hours of beginning and ending of each “Jour”, “Soir” and “Nuit”
 
 
 SCRIPT CONVERT DATA (from tab 'Réponses au formulaire 1'):
 
Horodatage	          Prénom	  Nom	        [01 juin]	 [02 juin]	 [03 juin]	 [04 juin]	 [05 juin]	 [06 juin]
2019-04-01 15:11:23	  Steve	  St-Pierre	    Jour	      Jour				
2019-04-01 17:22:11	  Steve3	St-Pierre4						


  TO:

Subject	          Start Date	  Start Time	  End Date	    End Time	All Day Event 	Description	Location
Steve St-Pierre 	01/06/2019	  07:45	        01/06/2019	  16:00		                  Jour	
Steve3 St-Pierre4	01/06/2019						
Steve St-Pierre	  02/06/2019	  07:45	        02/06/2019	  16:00		                  Jour	
Steve3 St-Pierre4	02/06/2019						
Steve St-Pierre	  03/06/2019						
Steve3 St-Pierre4	03/06/2019						
Steve St-Pierre	  04/06/2019						
Steve3 St-Pierre4	04/06/2019						
Steve St-Pierre 	05/06/2019						
Steve3 St-Pierre4	05/06/2019						
Steve St-Pierre	  06/06/2019						
Steve3 St-Pierre4	06/06/2019	

  AND PRINT DATA ON TAB 'Feuille 2'
