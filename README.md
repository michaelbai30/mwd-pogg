Matthew Spadafore and Michael Bai
React app located in poggcopy/pogg

INSTRUCTIONS FOR USE

1. Make sure you have the necessary dependencies installed. To do so, run npm install from the app location (poggcopy/pogg).
2. Run 'npm start' to begin application
3. You will be greeted with the home page. To actually use anything, you will need to be logged in.
    You may choose to register an account if you wish, or you can use an existing account:
    Email: test@example.com
    Password: test
    To navigate to auth, click on the Login/Register tab or any other tab and it will redirect you

TO USE MATCH HISTORY
    You can enter any (existing) summoner name into the bar, and then click the button to see a match history.
    Example names to try: HatenR (a friend's account),  bobjenkins1 (top NA player) 

    You can then click on the Advanced Stats button for a match to be brought to a more detailed info page.
    To view different graphs on this page, click any of the four buttons on the top
    These show individual or team damage or economy
        For reference:
            Elims: Number of times a player defeats another player
            Damage: Total damage dealt to other players
            CS: Stands for "creep score", amount of CPU controlled minions defeated (useful for gold)
            Gold: Amount of currency gathered in game, used to buy items

        K / D / A stands for Kills/Deaths/Assists, three important game statistics
        Items are things you can buy to gain stats
        The tables will display the profile image of a player, their name (summoner), and their champ (character) image

TO USE LEADERBOARDS
    Click on the first drop down to select a region (server) for the game to check, and the next to select a game queue (different ways to play ranked)
    A listing of the top players in the selected option will then appear.

TO USE USER STATS
    Enter a summoner/player name and click the button
    Information about that player will appear, such as their stats, ranked information, and their most played recent characters

    
Note for the future:
    Riot Games is moving towards a universal ID for recognizing players instead of a summoner name
    Our app uses summoner name to get information, and thus the API call may become deprecated in the future
    However, this change was incredibly recent, so it was very late into production to adjust for, but in the future it might become necessary.