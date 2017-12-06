#!/bin/bash



printf "\ntesting /recommendations/team_team\n"
python3 test_recommendations.py

printf "\ntesting /rankings/:team_name\n"
python3 test_rankings.py

printf "testing /teams/:team_name\n"
python3 test_teams.py

printf "\ntesting /reset/\n"
python3 test_reset.py

