 document.addEventListener("DOMContentLoaded",function(){
         const searchButton =  document.getElementById("search-btn");
         const usernameInput =  document.getElementById("user-input");
         const statsContainer =  document.querySelector(".stats-container");
         const easyProgressCircle =  document.querySelector(".easy-progress");
         const mediumProgressCircle =  document.querySelector(".medium-progress");
         const hardProgressCircle =  document.querySelector(".hard-progress");
         const easyLabel =  document.getElementById("easy-label");
         const mediumLabel =  document.getElementById("medium-label");
         const hardLabel =  document.getElementById("hard-label");
         const cardStatsContainer =  document.querySelector(".stats-cards");
         
         function validDataUsername(username){
            if(username.trim()===""){
                alert("username should not be empty");
                return false;
            }
            const regex = /^[a-zA-Z0-9_-]{1,15}$/;
            const isMatching= regex.test(username);
            if(!isMatching){
                alert("invalid username");
            }
            return isMatching;

         }
         async function fetchUserDetails(username){

               const url =`https://leetcode-stats-api.herokuapp.com/${username}`
                try{
                    searchButton.textContent = "searching...";
                    searchButton.disabled = true;

                   const response = await fetch(url);
                   
               
                    if(!response.ok){
                        throw new Error("unable to fetch details");
                        
                    }
                    const parsedData = await response.json();
                    console.log("logging data:",parsedData);
                    displayUserData(parsedData);
                }
                catch(error){
                            statsContainer.innerHTML=`<p>no data found</p>`
                }
                finally{
                            searchButton.textContent="search";
                            searchButton.disabled=false;
                }
         }
         function updateProgress(solved,total,label,circle){
             const progressDegree = (solved/total)*100;
             circle.style.setProperty("--progress-degree",`${progressDegree}%`);
             label.textContent = `${solved}/${total}`;
         }
          function displayUserData(parsedData){
            const totalQues = parsedData.totalQuestions|| 0;
            const totalEasyQues = parsedData.totalEasy || 0;
            const totalMediumQues = parsedData.totalMedium || 0;
            const totalHardQues = parsedData.totalHard|| 0;
    
            const solvedTotalEasyQues = parsedData.easySolved|| 0;
            const solvedTotalMediumQues = parsedData.mediumSolved|| 0;
            const solvedTotalHardQues = parsedData.hardSolved || 0;

            updateProgress(solvedTotalEasyQues,totalEasyQues,easyLabel,easyProgressCircle);
            updateProgress(solvedTotalMediumQues,totalMediumQues,mediumLabel,mediumProgressCircle);
            updateProgress(solvedTotalHardQues,totalHardQues,hardLabel,hardProgressCircle);
            
          }

         searchButton.addEventListener('click',function(){
            const username = usernameInput.value;
            console.log("login username",username);
            if(validDataUsername(username)){
                fetchUserDetails(username);

            }
         })
 })