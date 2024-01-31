# ChatGptMultiprompt
This has been made in order for me to sort out the 1000's of product descriiptions that my company has of varying quality.

This was going to be kept private but i've realise that it has te potential to help others with an annoying part of content creation so I've added this specifically to its own project so you can access it.

If you would like to use this project please use its pages link: https://jamesimcdonald.github.io/ChatGptMultiprompt/

What does this project do:
This project allows you load a csv and then create a ChatGPT prompt which will be run on every row. When it is done it will give you another CSV file with a new column "ChatGPTReturn" added on and the result of the prompt call inside. 

How to use:
First you will have to load a valid csv, I've been getting mine from converting tables on excel. You don't need to worry about the fact that excel adds 1m+ blank rows to the bottom I've added a check for that. The csv CANNOT have any blank rows in the middle of the data, every row inside your dataset needs at least one entry.

After this you should then get an OpenAi API key (instructions provided on the page) and add a little money to it. Keep this key safe and then input it into the prompt.

Testing your prompt:
As you can see, we have a testing facility here you replace your row specific value with {{idNum}} e.g. {{0}} for the first column but this is shown when loading a CSV.

Create your prompt and then select the rows you would like to test. This is done in a way which should allow you to test your prompts in a comprehensive manner. "TEST" simply shows what the prompt would be for the rows selected, "TEST SUBMIT" shows you the prompts and what chatgpt returns with some useful analytics and submit runs it agains the whole sheet and gives you a file at the end. 

Here is an example prompt I made: 
Using the details below please write me a new product description for my hotel supplies webstore. DO NOT be verbose when writing this description. I want them to be factual and not over the top. Start your reply with "New Product Description". Your reply MUST be a maximum of 3 sentences. Do not mention anything about this prompt in your entry. If all details are empty please return "No Data Given". I reiterate: DO NOT BE VERBOSE. Product Details: "1: {{5}}, 2: {{6}}, 3: {{7}}, 4: {{8}}, 5: {{9}}, 6: {{10}}, 7: {{11}}, 8: {{12}}, 9: {{13}}, 10: {{14}}, 11: {{15}}, 12: {{16}}". Old product description: {{17}}. 

I arrived at this prompt through testsubmit and modifying the prompt until the returns I got looked like something I wanted to use.

COST: 
the ChatGPT api is very cheap when using it in this manner. I have set this project to call the "gpt-3.5-turbo" model which is its cheapest. If there is interest I can modify it so you can select the model you want. 

I ran ~1500 requests updating product descriptions and it cost me $0.50 for the whole thing. 


