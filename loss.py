import numpy as np

def custom_loss(stock_price, actions, gain_param=2, loss_param=2):
    """
    stock_price: stock price (np.array)
    actions: trading actions (1 for buy, -1 for short)
    gain_param: parameter for gain (float)
    loss_param: parameter for loss (float)
    """
    loss_value = 0
    
    for i in range(1, len(stock_price)):
        # Calculate Profit/Loss
        price_change = stock_price[i] - stock_price[i-1]
        
        # Check the action for the current time step
        if actions[i] == 1 and price_change < 0:
            loss_value += (loss_param * price_change)**2
        elif actions[i] == -1 and price_change > 0:
            loss_value += (loss_param * price_change)**2
        else:
            loss_value -= (gain_param * price_change)**2
    
    return loss_value


#testing 

stock_test = np.array([1, 2, 3, 4, 5])
suggest_actions = np.array([1, 1, 1, 1, 1])
test_val = custom_loss(stock_test, suggest_actions, gain_param=2, loss_param=2)

print(test_val)

