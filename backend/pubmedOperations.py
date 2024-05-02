import re
import urllib
from time import sleep
import pandas as pd
from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
plt.switch_backend('agg')
import io
import base64
import os



def find_doi(row):
    for col in row[4:]:  # Adjusted to start from the 5th column (index 4) to the end
        if col is not None and (col.lstrip().startswith('DOI') or col.lstrip().startswith('PMID')):
            return col
    return 'no link found'


def remove_index(title):
    # Use regular expression to remove the index number and following dot and space
    # Pattern explanation:
    # ^ - start of the string
    # \d+ - one or more digits
    # \. - a literal dot
    # \s - any whitespace character
    # - the above pattern is then replaced with an empty string
    cleaned_title = re.sub(r'^\d+\.\s', '', title)
    return cleaned_title

def createWordCloud(content,work_id):
    comment_words = ''
    stopwords = set(STOPWORDS)

    # iterate through the csv file
    for val in content:

        # typecaste each val to string
        val = str(val)

        # split the value
        tokens = val.split()

        # Converts each token into lowercase
        for i in range(len(tokens)):
            tokens[i] = tokens[i].lower()

        comment_words += " ".join(tokens)+" "

    wordcloud = WordCloud(width = 800, height = 800,
                    background_color ='white',
                    stopwords = stopwords,
                    min_font_size = 10).generate(comment_words)
    # plot the WordCloud image                       
    plt.figure(figsize = (8, 8), facecolor = None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad = 0)
    buf = io.BytesIO()
    plt.savefig(buf, format='png')  # You can change the format as needed
    buf.seek(0)

    # Create a byte array from the BytesIO object
    byte_array = buf.getvalue()
    encoded_image = base64.b64encode(byte_array).decode('utf-8')
    
    # close the buffer
    buf.close()
    plt.close()
    return encoded_image



def searchPubmed(query,work_id):
    result={'total_abstracts':0,'downloaded_abstracts':0, 'searchQuery':query,'work_id':work_id, 'dict':'', 'image':''}
    query=query.replace(' ','+')

    # common settings between esearch and efetch
    base_url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
    db = 'db=pubmed'

    # esearch specific settings
    search_eutil = 'esearch.fcgi?'
    search_term = '&term=' + query
    search_usehistory = '&usehistory=y'
    search_rettype = '&rettype=json'
    search_url = base_url+search_eutil+db+search_term+search_usehistory+search_rettype
    f = urllib.request.urlopen(search_url)
    search_data = f.read().decode('utf-8')
    total_abstract_count = int(re.findall("<Count>(\d+?)</Count>",search_data)[0])
    result['total_abstracts']=total_abstract_count
    if total_abstract_count < 1:
        return result
    
    # obtain webenv and querykey settings for efetch command
    fetch_webenv = "&WebEnv=" + re.findall ("<WebEnv>(\S+)<\/WebEnv>", search_data)[0]
    fetch_querykey = "&query_key=" + re.findall("<QueryKey>(\d+?)</QueryKey>",search_data)[0]
    
    # other efetch settings
    fetch_eutil = 'efetch.fcgi?'
    retmax = 20
    retstart = 0
    fetch_retstart = "&retstart=" + str(retstart)
    fetch_retmax = "&retmax=" + str(retmax)
    fetch_retmode = "&retmode=text"
    fetch_rettype = "&rettype=abstract"
    fetch_data=""
    # call efetch commands using a loop until all abstracts are obtained
    run = True
    all_abstracts = list()
    loop_counter = 1
    max_total =100
    while run:
        if (loop_counter==5):
            run = False
        loop_counter += 1
        fetch_retstart = "&retstart=" + str(retstart)
        fetch_retmax = "&retmax=" + str(retmax)
        # create the efetch url
        fetch_url = base_url+fetch_eutil+db+fetch_querykey+fetch_webenv+fetch_retstart+fetch_retmax+fetch_retmode+fetch_rettype
        # open the efetch url
        f = urllib.request.urlopen (fetch_url)
        fetch_data +=  f.read().decode('utf-8') + '\n\n\n'

        # wait 2 seconds so we don't get blocked
        sleep(2)
        # update retstart to download the next chunk of abstracts
        retstart = retstart + retmax
        if (retstart > total_abstract_count):
            run = False
        # split the data into individual abstracts
    all_abstracts = fetch_data.split("\n\n\n")
    result['message']="a total of " + str(len(all_abstracts)) + " abstracts have been downloaded.\n"

    abstracts=fetch_data.split('\n\n\n')
    abstracts_list=[]
    for abstract in abstracts:
        abstracts_list.append(abstract.split('\n\n'))
    abstracts_list.pop()
    result['downloaded_abstracts']=len(abstracts)-1

    df=pd.DataFrame(abstracts_list)
    df[0] = df[0].apply(remove_index)
    df['Link'] = df.apply(find_doi, axis=1)
    for i in range(0,df.shape[0]):
        if(df.iloc[i,4] is not None):
            df.iloc[i,4]=df.iloc[i,4].lstrip()
            if(df.iloc[i,4].startswith('Comment') or df.iloc[i,4].startswith('Erratum') or df.iloc[i,4].startswith('Update') or df.iloc[i,4].startswith('Author')):
                df.iloc[i,4]=df.iloc[i,5]
            if(df.iloc[i,4].startswith('DOI')):
                df.iloc[i,4]=df.iloc[i,3]
        else:
            df.iloc[i,4]=""
    result['image']=createWordCloud(df.iloc[:,4],work_id)
    new_df = df[[0,1,2,3,4,'Link']].rename(columns={0: 'Journal', 1: 'Title', 2: 'Author', 3: 'Author Info', 4: 'Abstract'})
    dictdf=new_df.to_dict()
    filepath=os.path.join('userDocs',work_id+'.xlsx')     
    
    new_df.to_excel(filepath,index=False)
    result['dict']=dictdf
    return result