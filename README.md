# ChatGptMultiprompt
This has been made in order for me to sort out the 1000's of product descriptions that my company has of varying quality.

This was going to be kept private but i've realised that it has te potential to help others with an annoying part of content creation so I've added this to its own repo so you can access it.

If you would like to use this project please use its pages link: https://jamesimcdonald.github.io/ChatGptMultiprompt/

Also sorry that this is so hacked together, I was mostly doing this for myself as I'm learning so I'm sure that best practices haven't been followed.

## What does this project do:
This project allows you load a csv and then create a ChatGPT prompt which will be run on every row, this prompt can also reference cells in the row with {{idNum}} which is displayed. When it is done it will give you another CSV file with a new column "ChatGPTReturn" added on and the result of the prompt call inside. 

## How to use:
### First
You will have to load a valid csv, I've been getting mine from converting tables on excel. You don't need to worry about the fact that excel adds 1m+ blank rows to the bottom I've added a check for that. The csv **CANNOT** have any blank rows in the middle of the data, every row inside your dataset needs at least one entry, please add one if you haven't.

### Second 
You should then get an OpenAi API key (instructions provided on the page) and add a little money to it. Keep this key safe and then input it into the prompt. Don't worry about me looking at it as you can see in the code I've got nothing that can do that.

### Third - Testing your prompt:
As you can see, we have a testing facility here you replace your row specific value with {{idNum}} e.g. {{0}} for the first column but this is shown when loading a CSV.

Create your prompt and then select the rows you would like to test. This is done in a way which should allow you to test your prompts in a comprehensive manner. "TEST" simply shows what the prompt would be for the rows selected, "TEST SUBMIT" shows you the prompts and what chatgpt returns with some useful analytics. 

### Fourth - Full Run:
Now that you have a prompt that you're happy with please click "Submit" this will now do a full run of all of the entries in your table and once done it will offer you a CSV file to download with "ChatGPTReturn" at the end with all of your returns.

### Here is an example prompt I made: 
Using the details below please write me a new product description for my hotel supplies webstore. DO NOT be verbose when writing this description. I want them to be factual and not over the top. Start your reply with "New Product Description". Your reply MUST be a maximum of 3 sentences. Do not mention anything about this prompt in your entry. If all details are empty please return "No Data Given". I reiterate: DO NOT BE VERBOSE. Product Details: "1: {{5}}, 2: {{6}}, 3: {{7}}, 4: {{8}}, 5: {{9}}, 6: {{10}}, 7: {{11}}, 8: {{12}}, 9: {{13}}, 10: {{14}}, 11: {{15}}, 12: {{16}}". Old product description: {{17}}. 

That turned into: 
Using the details below please write me a new product description for my hotel supplies webstore. DO NOT be verbose when writing this description. I want them to be factual and not over the top. Start your reply with "New Product Description". Your reply MUST be a maximum of 3 sentences. Do not mention anything about this prompt in your entry. If all details are empty please return "No Data Given". I reiterate: DO NOT BE VERBOSE. Product Details: "1: 10L Capacity. Size 27 X 23 CM, 2: Removable Outer Shell That Conceals The Bin Liner, 3: Vinyl Covered Steel With Anti Scuff Base, 4: , 5: , 6: , 7: , 8: , 9: , 10: , 11: , 12: ". Old product description: Our deluxe bins are available in 5 modern colours. These 2 layer bins cleverly hide the bin bags & liners from view. 

I arrived at this prompt through testsubmit and modifying the prompt until the returns I got looked like something I wanted to use. As there is no functionality to specifically save some specific responses from the testing phase this is generally just so you can work out how to consistently make a prompt which works.  

## COST: 
the ChatGPT api is very cheap when using it in this manner. I have set this project to call the "gpt-3.5-turbo" model which is its cheapest. If there is interest I can modify it so you can select the model you want. 

I ran ~1500 requests updating product descriptions and it cost me $0.50 for the whole thing. 


