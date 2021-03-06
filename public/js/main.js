function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function beResponsive() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


/*---------- vue.js ----------*/

var getSongs = new Vue({
  el: '#body',

  data: {
      requests: [],             // array for a new song to request
      songsNames: [],           // array of the songs that have been requested (fetched from database)
      currentMenu: 'Home',      // contains the name of the active page (for the header menu)
      activeHome : '',          // used for the class "active" in the header menu
      currentContent: 'Home',   // used to display the data for the diffrent pages ("Home" will make the homepage displayed)
      currentSong: '',          // this is used to display the last song clicked in the songs list in homepage. Also used to determine what song will be displayed in the modal
      videoIframeID: '',        // contains the youtube ID of the video
      user: '',                 // username of the person who is logged in. If it is '' or null, there is no one logged in
      userGrade: '',            // this is to determin what the user can do, there is casual / mod (can delete songs) / supermod (can delete songs and change the grade of casual & mod)
      dataUsername: '',         // this is a bind var for the login page
      dataPassword: '',         // this is a bind var for the login page
      dataCheckPassword: '',    // this is a bind var for the login page
      UserMessage: '',          // this is a bind var for the homepage page (for the modal)
      inputLink: '',            // this is a bind var for the request page
      inputMessage: '',         // this is a bind var for the request page
  },

  created: function (argument) {

      var name = localStorage.getItem('name');
      var grade = localStorage.getItem('grd');
      if (name !== null){
        this.user = name;
      }
      if (grade !== null){
        this.userGrade = grade;
      }

      this.fetchRequests();
  },

  methods: {
    fetchRequests () {

      this.songsNames = [];

      var vm = this;
      var a = '';

      var promiseKey = new Promise(function(resolve, reject) {

        fetch('https://apex.oracle.com/pls/apex/anime_keeper/Jzit/getKey').then(function(response){
          return response.json()
        })
        .then(function(data){
          a = data.items[0].key;
        })

        resolve(a);
      });

      fetch('https://apex.oracle.com/pls/apex/anime_keeper/Jzit/getRequest').then(function(response) {

        return response.json()

      })
      .then(function(data) {

        var items = data.items;

        items.forEach(function(item){

          var videoId = getId(item.link);
          var user = item.username;
          var msg = item.message;
          var idOfSong = item.id;

          promiseKey.then(function(key){

            query = 'https://www.googleapis.com/youtube/v3/videos?id='+ videoId +'&key='+ a +'&fields=items(snippet(title))&part=snippet' ;

            // query = '/video?id=' + videoId;
            
            fetch(query).then(function(video) {
              
              return video.json();

            }).then(function(video) {

                var video_name = video.items[0].snippet.title;

                vm.songsNames.push({ name: video_name , linkID : videoId , username : user, usermsg : msg, idSong: idOfSong});

            })


          })

            
        })               
      })
    },
    goBackHome (){
      
      this.currentMenu = "Home";
      this.currentContent = "Home";
      this.activeHome = "active";
      var x = document.getElementById("myTopnav");
      x.className = "topnav";

    },
    setCurrentMenu(menu) {

      if (menu === "Login" && this.user !== ""){
        this.currentContent = "Logout"
      }
      else{
      this.currentContent = menu
      }

      this.currentMenu = menu
      var x = document.getElementById("myTopnav");
      x.className = "topnav";

    },
    linkVidModal(){
      $("#inputVideo").empty();
      var videoId = this.videoIframeID;
      var iframe = document.createElement('iframe');
      iframe.src = "https://www.youtube.com/embed/" + videoId +"";
      $("#inputVideo").append(iframe);
    },
    activeClass(menuItem) {

      if (menuItem === this.currentMenu) {
        return 'active'
      }
      return ''

    },
    activateSong(song, id, msg){

      this.UserMessage = msg;
      this.currentSong = song;
      this.videoIframeID = id;

    },
    activeClassSong(songItem){

      if (songItem === this.currentSong) {
        return 'active'
      }
      return ''

    },
    login(name, password){
      var vm = this

      fetch('https://apex.oracle.com/pls/apex/anime_keeper/Jzit/getUser').then(function(response) {

        return response.json()

      })
      .then(function(data) {
      
        //console.log(data.items)

        var usersData = data.items;
        var md5Password = MD5(password);

        usersData.forEach(function(item){

          console.log("attemp login")
          if (md5Password === item.password) {
            if (name === item.username) {

              vm.user = ' - ' + name;
              vm.userGrade = item.grade;
              console.log("login sucess")
              localStorage.setItem('name', name);
              localStorage.setItem('grd', item.grade);
              getSongs.goBackHome();
              return;
            }
          }
        })
        data = '';
      })
    },
    logout(){

      this.user = '';
      this.userGrade = '';
      localStorage.setItem('name', '');
      localStorage.setItem('grd', '');
      getSongs.goBackHome();

    },
    register(name, password, checkPassword)
    {

      if (password === checkPassword) {

        passwd = MD5(password);

        fetch('https://apex.oracle.com/pls/apex/anime_keeper/Jzit/register',
        {
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({USERNAME: name, PASSWORD: passwd, GRADE: "casual"})
        })
        .then(function(res){ getSongs.fetchRequests() })
        .catch(function(res){ console.log(res) })

        this.user = ' - ' + name;
        this.userGrade = 'casual';
        localStorage.setItem('name', name);
        localStorage.setItem('grd', 'casual');
        getSongs.goBackHome();
      }
      else{
        alert("Input the same password please");
      }

    },
    deleteSong(id){

      if(this.userGrade !== "mod" && this.userGrade !== "supermod")
      {
        alert("you must be logged as an admin or mod to delete a song");
      }
      else
      {
        fetch('https://apex.oracle.com/pls/apex/anime_keeper/Jzit/deleteSong',
        {
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ID: id})
        })
        .then(function(res){ getSongs.fetchRequests() })
        .catch(function(res){ console.log(res) })
      }
    },
    addRequest(){

      if(this.user === "")
      {
        alert("you must be logged in to submit a song")
      }
      else
      {

        var message = this.inputMessage.trim();
        // Check the link
        var link = this.inputLink.trim();

        if (link  === '') {
            alert('input link please');
            return false;
        }

        var xhr = new XMLHttpRequest();
        var url = "https://apex.oracle.com/pls/apex/anime_keeper/Jzit/postRequest";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
            }
        };
        var data = JSON.stringify({"LINK": link, "MESSAGE": message, "USER": this.user});
        xhr.send(data);

        this.inputMessage = '';
        this.inputLink = '';

        getSongs.activeClass('Home');
        getSongs.setCurrentMenu('Home');
        getSongs.fetchRequests();
      }
    },
  }
})












var MD5 = function (string) {

   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;

   string = Utf8Encode(string);

   x = ConvertToWordArray(string);

   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
      }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}








// $(document).ready(function() {

//   //getRequests();

//  // $( ".request_button" ).click(function() {
//  //   addRequest();
//  // });

//   // non vue.js option
//   // $( ".action" ).click(function() {
//   //   getRequests();
//   // });

//   // $( ".menu" ).click(function() {
//   //   $("a").removeClass( "active" );
//   //   $(this).addClass( "active" );
//   // });

//   // showHTML();

//  // includeHTML();

// });




// function getRequests(){

//   $.ajax({
//     type: 'GET',
//     url: 'https://apex.oracle.com/pls/apex/anime_keeper/Jzit/getRequest',
//     success: function(data) {
//       showData(data);
//       //console.log(data);
//     },

//     error: function() {

//       console.log('La requête n\'a pas abouti'); 
//     }

//   });    

// }

// function showData(data) {

//   //$("#listOfSongs").empty();

//   var items = data.items;
//   var ul = document.createElement('ul');

//   document.getElementById('listOfSongs').appendChild(ul);

//   items.forEach(function (item) {

//     var li = document.createElement('li');
//     ul.appendChild(li);

//     addIFrame(item.link, li);

//   });


// }

// function addIFrame(link, list){

//   var videoId = getId(link);

//   // var iframe = document.createElement('iframe');
//   // iframe.src = "https://www.youtube.com/embed/" + videoId +"";
//   // list.appendChild(iframe);

//   var key = "AIzaSyApxjtXcMyjhi83AG8CjBxvE4-WBkMwNAE";

//   q = 'https://www.googleapis.com/youtube/v3/videos?id='+ videoId +'&key='+ key +'&fields=items(snippet(title))&part=snippet' ;

//   $.ajax({
//         url: q, 
//         dataType: "jsonp",
//         success: function(data){
//           var video_name = data.items[0].snippet.title;
//           list.append(video_name);

//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//           alert (textStatus, + ' | ' + errorThrown);
//           var video_name = "ERROR_LOADING_NAME";
//         }
//     });

//     // imagelink = "<img src=\"http:\/\/img.youtube.com\/vi\/"+videoId+"\/hqdefault.jpg\">";

//     // var video_thumbnail = $(imagelink);
//     // $("#Ho").append(video_thumbnail);
        

// }

// function showHTML() {

//   $( ".Hom" ).click(function() {
//     //getRequests();
//     $(".content").attr('hidden', 'true');
//     $(".Ho").removeAttr("hidden");
//   });

//   $( ".Req" ).click(function() {
//     $(".content").attr('hidden', 'true');
//     $(".Re").removeAttr("hidden");
//   });

//   $( ".Abo" ).click(function() {
//     $(".content").attr('hidden', 'true');
//     $(".Ab").removeAttr("hidden");
//   });

//   $( ".Log" ).click(function() {
//     $(".content").attr('hidden', 'true');
//     $(".Lo").removeAttr("hidden");
//   });

// }


// function includeHTML() {
//   var z, i, elmnt, file, xhttp;
//   /*loop through a collection of all HTML elements:*/
//   z = document.getElementsByTagName("*");
//   for (i = 0; i < z.length; i++) {
//     elmnt = z[i];
//     /*search for elements with a certain atrribute:*/
//     file = elmnt.getAttribute("w3-include-html");
//     if (file) {
//       /*make an HTTP request using the attribute value as the file name:*/
//       xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function() {
//         if (this.readyState == 4) {
//           if (this.status == 200) {elmnt.innerHTML = this.responseText;}
//           if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
//           /*remove the attribute, and call this function once more:*/
//           elmnt.removeAttribute("w3-include-html");
//           includeHTML();
//         }
//       }
//       xhttp.open("GET", file, true);
//       xhttp.send();
//       /*exit the function:*/
//       return;
//     }
//   }
// }


// function addRequest() {

//  var message = $.trim($('.message').val());
//  // Check the link
//     var link = $.trim($('.link').val());

//     if (link  === '') {
//         alert('input link please');
//         return false;
//     }

//  var xhr = new XMLHttpRequest();
//  var url = "https://apex.oracle.com/pls/apex/anime_keeper/Jzit/postRequest";
//  xhr.open("POST", url, true);
//  xhr.setRequestHeader("Content-Type", "application/json");
//  xhr.onreadystatechange = function () {
//      if (xhr.readyState === 4 && xhr.status === 200) {
//          var json = JSON.parse(xhr.responseText);
//      }
//  };
//  var data = JSON.stringify({"LINK": link, "MESSAGE": message});
//  xhr.send(data);

//  $(".message").val('');
//  $(".link").val('');

// }