<template>
  <main>
    <div>
      <template v-if="checkUserAuth===false">
        <user-navbar></user-navbar>
      </template>
      <div class="col-12 text-center my-3">
        <img :src="this.awsUrls+'/media/recipe_image/'+recipe.uuid+'.png'"
             class="img-fluid"
             style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);" alt>
        <h2 class="mb-3 display-4 text-uppercase">{{ recipe.name }}</h2>
        <h2 class="mb-3 display-4 text-uppercase">Recipe Owner: {{ recipeUser.username }}</h2>
        <h2 class="mb-3 display-4 text-uppercase">Recipe Likes: {{ likes }}</h2>
        <div class="action-buttons">
          <b-button @click="eatIt" variant="success" :disabled="checkUserAuth">I Eated It Today Again
          </b-button>
          <!--        <nuxt-link :to="`/recipeviewer/?uuid=${recipe.uuid}`" class="btn btn-sm btn-success"> I Eated It Today Again </nuxt-link>-->
        </div>
      </div>
      <!--      <div class="col-md-6 mb-4">-->
      <!--             </div>-->
      <div class="col-12 text-center my-3">
        <template class="recipe-details">
          <h4>Ingredients</h4>
          <b-card-group deck>
            <!--            <p v-for="ingredient in recipe.ingredients">{{ ingredient.name }}</p>-->
            <template
              v-for="ingredient in recipe.ingredients">
              <div>
                <ingredient-card :ingredient="ingredient">
                </ingredient-card>
              </div>
            </template>
          </b-card-group>
          <h4>Calories</h4>
          <p>{{ recipe.calories }} kcal</p>
          <h4>Cuisine
            <country-flag :country=this.isoConv size='big'/>
          </h4>
          <p>{{ recipe.cuisine }}</p>
          <h4>Preparation time ⏱</h4>
          <p>{{ recipe.prep_time }} mins</p>
          <h4>Difficulty</h4>
          <p>{{ recipe.difficulty }}</p>
          <b-progress :value="100" variant="danger" class="mt-3"
                      v-if="recipe.difficulty  === 'Hard'"></b-progress>
          <b-progress :value="70" variant="info" striped class="mt-2"
                      v-if="recipe.difficulty  === 'Medium'"></b-progress>
          <b-progress :value="20" variant="warning" striped class="mt-2"
                      v-if="recipe.difficulty  === 'Easy'"></b-progress>
          <h4>Preparation guide</h4>
          <b-form-textarea class="form-control" v-html="recipe.preparation" rows="3" max-rows="18" plaintext/>
          <h4>Comments</h4>
          <b-card-group deck>
            <template
              v-for="(comment) in this.previosComments">
              <div>
                <comment-card :comment="comment">
                </comment-card>
              </div>
            </template>
          </b-card-group>
          <h4>Add Comment</h4>
          <b-form-textarea class="form-control" rows="3" max-rows="18" v-html="comment" v-model="comment"/>
        </template>
      </div>
      <div>
        <b-button @click="liked" variant="success" :disabled="checkUserAuth">Like</b-button>
        <b-button @click="writecomment" variant="success" :disabled="checkUserAuth">Comment
        </b-button>
      </div>
    </div>
  </main>
</template>
<script>
  import CommentCard from "../../../components/CommentCard";
  import IngredientCard from "../../../components/IngredientCard";
  import CountryFlag from 'vue-country-flag'
  import {empty} from "../../../.nuxt/utils";
  import UserNavbar from "../../../components/user-navbar";
  import awsUrls from "../../../static/urls.json";

  function getSafe(fn) {
    try {
      return fn();
    } catch (e) {
      return undefined;
    }
  }

  export default {
    components: {CommentCard, IngredientCard, CountryFlag, UserNavbar},
    computed: {
      checkUserAuth: function () {
        return !this.currentUser.username;
      }
    },
    head() {
      return {
        title: "View Recipe"
      };
    },
    async mounted() {
      // this.$nuxt.$loading.start();
      await getSafe(() => {
        this.$auth.fetchUser().then((resp) => {
          this.currentUser = resp.data;
          // console.log("currentuser");
          // console.log(this.currentUser);
        });
      });
      const config = {
        headers: {"content-type": "application/json"}
      };
      // console.log("params: " + this.$nuxt.$route.query.uuid);
      await this.$axios.get('/api/recipe/getrecipe/', {
        params: {
          uuid: this.$nuxt.$route.query.uuid
        }
      }).then((resp) => {
        // console.log("response: " + resp);
        // console.log("response data: " + resp.data);
        // console.log("response data name: " + resp.data['name']);
        this.recipe = resp.data['recipe'];
        this.likes = resp.data['likes'];
        this.previosComments = resp.data['comments'];
        console.log(this.previosComments)

        // console.log("prev comments:\n")
        // console.log(this.previosComments)
        for (var index = 0; index < this.previosComments.length; index++) {
          // console.log(this.previosComments[index])
        }
      });
      await this.$axios.get('/api/users/getuser/', {
        params: {
          id: this.recipe.user.id
        }
      }).then((resp) => {
        // console.log("response: " + resp);
        // console.log("response data: " + resp.data);
        this.recipeUser = resp.data;
      });
      const cuisine = this.recipe.cuisine;
      // console.log("cuisine: " + cuisine);
      // console.log("cuisine 2: " + this.recipe.cuisine);
      if (cuisine)
        this.isoConv = isoCountries[cuisine.split(" ")[0]];
      // console.log("recipe name: " + this.recipe.name);
      // console.log("recipe uuid: " + this.recipe.uuid);
      this.awsUrls = awsUrls.awsLink;
    },
    data() {
      return {
        recipe: {
          uuid: "",
          name: "",
          // picture: "",
          ingredients: "",
          recipe_image: "",
          preparation: "",

          // difficulty: "",
          // prep_time: null,
          // prep_guide: ""
        },
        currentUser: {},
        likes: "",
        comment: "",
        previosComments: [],
        recipeUser: {},
        isoConv: "",
        awsUrls: ''
      };
    },
    methods: {
      async liked() {
        await this.$auth.fetchUser().then((resp) => {
          this.currentUser = resp.data;
        });
        await this.$axios.get('/api/recipe/increaselike', {
            params: {
              userId: this.currentUser.id,
              recipeid: this.recipe.uuid
            }
          }
        ).then((resp) => {
          this.loading = false;
          setTimeout(() => this.$nuxt.$loading.finish(), 5000)
          this.recipes = resp.data;
        });
        this.$router.go();

      },
      async writecomment() {
        await this.$axios.get('/api/recipe/writecomment', {
            params: {
              recipeid: this.recipe.uuid,
              comment: this.comment
            }
          }
        ).then((resp) => {
          this.loading = false;
          setTimeout(() => this.$nuxt.$loading.finish(), 5000)
          this.recipes = resp.data;
        });
        this.$router.go();
      },
      async eatIt() {
        await this.$auth.fetchUser().then((resp) => {
          this.currentUser = resp.data;
        });
        await this.$axios.get('/api/cpd/addintocalories', {
            params: {
              userId: this.currentUser.id,
              recipeid: this.recipe.uuid
            }
          }
        ).then((resp) => {
          this.loading = false;
          setTimeout(() => this.$nuxt.$loading.finish(), 5000)
          this.recipes = resp.data;
        });
        this.$router.go();
      },
      checkUserAuth() {
        if (this.currentUser.username === 'kerem2') {
          // console.log(this.currentUser.username);
          // console.log("this.currentUser.username");
          return true;
        } else {
          return false;
        }

      }
    }
  };
  var isoCountries = {
    'Afghanistan': 'AF',
    'Aland Islands': 'AX',
    'Albania': 'AL',
    'Algeria': 'DZ',
    'American Samoa': 'AS',
    'Andorra': 'AD',
    'Angola': 'AO',
    'Anguilla': 'AI',
    'Antarctica': 'AQ',
    'Antigua And Barbuda': 'AG',
    'Argentina': 'AR',
    'Armenia': 'AM',
    'Aruba': 'AW',
    'Australia': 'AU',
    'Austria': 'AT',
    'Azerbaijan': 'AZ',
    'Bahamas': 'BS',
    'Bahrain': 'BH',
    'Bangladesh': 'BD',
    'Barbados': 'BB',
    'Belarus': 'BY',
    'Belgium': 'BE',
    'Belize': 'BZ',
    'Benin': 'BJ',
    'Bermuda': 'BM',
    'Bhutan': 'BT',
    'Bolivia': 'BO',
    'Bosnia And Herzegovina': 'BA',
    'Botswana': 'BW',
    'Bouvet Island': 'BV',
    'Brazil': 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei Darussalam': 'BN',
    'Bulgaria': 'BG',
    'Burkina Faso': 'BF',
    'Burundi': 'BI',
    'Cambodia': 'KH',
    'Cameroon': 'CM',
    'Canada': 'CA',
    'Cape Verde': 'CV',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    'Chad': 'TD',
    'Chile': 'CL',
    'China': 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    'Colombia': 'CO',
    'Comoros': 'KM',
    'Congo': 'CG',
    'Congo, Democratic Republic': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    'Cote D\'Ivoire': 'CI',
    'Croatia': 'HR',
    'Cuba': 'CU',
    'Cyprus': 'CY',
    'Czech Republic': 'CZ',
    'Denmark': 'DK',
    'Djibouti': 'DJ',
    'Dominica': 'DM',
    'Dominican Republic': 'DO',
    'Ecuador': 'EC',
    'Egypt': 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    'Eritrea': 'ER',
    'Estonia': 'EE',
    'Ethiopia': 'ET',
    'Falkland Islands': 'FK',
    'Faroe Islands': 'FO',
    'Fiji': 'FJ',
    'Finland': 'FI',
    'France': 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    'Gabon': 'GA',
    'Gambia': 'GM',
    'Georgia': 'GE',
    'Germany': 'DE',
    'Ghana': 'GH',
    'Gibraltar': 'GI',
    'Greece': 'GR',
    'Greenland': 'GL',
    'Grenada': 'GD',
    'Guadeloupe': 'GP',
    'Guam': 'GU',
    'Guatemala': 'GT',
    'Guernsey': 'GG',
    'Guinea': 'GN',
    'Guinea-Bissau': 'GW',
    'Guyana': 'GY',
    'Haiti': 'HT',
    'Heard Island & Mcdonald Islands': 'HM',
    'Holy See (Vatican City State)': 'VA',
    'Honduras': 'HN',
    'Hong Kong': 'HK',
    'Hungary': 'HU',
    'Iceland': 'IS',
    'India': 'IN',
    'Indonesia': 'ID',
    'Iran, Islamic Republic Of': 'IR',
    'Iraq': 'IQ',
    'Ireland': 'IE',
    'Isle Of Man': 'IM',
    'Israel': 'IL',
    'Italy': 'IT',
    'Jamaica': 'JM',
    'Japan': 'JP',
    'Jersey': 'JE',
    'Jordan': 'JO',
    'Kazakhstan': 'KZ',
    'Kenya': 'KE',
    'Kiribati': 'KI',
    'Korea': 'KR',
    'Kuwait': 'KW',
    'Kyrgyzstan': 'KG',
    'Lao People\'s Democratic Republic': 'LA',
    'Latvia': 'LV',
    'Lebanon': 'LB',
    'Lesotho': 'LS',
    'Liberia': 'LR',
    'Libyan Arab Jamahiriya': 'LY',
    'Liechtenstein': 'LI',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Macao': 'MO',
    'Macedonia': 'MK',
    'Madagascar': 'MG',
    'Malawi': 'MW',
    'Malaysia': 'MY',
    'Maldives': 'MV',
    'Mali': 'ML',
    'Malta': 'MT',
    'Marshall Islands': 'MH',
    'Martinique': 'MQ',
    'Mauritania': 'MR',
    'Mauritius': 'MU',
    'Mayotte': 'YT',
    'Mexico': 'MX',
    'Micronesia, Federated States Of': 'FM',
    'Moldova': 'MD',
    'Monaco': 'MC',
    'Mongolia': 'MN',
    'Montenegro': 'ME',
    'Montserrat': 'MS',
    'Morocco': 'MA',
    'Mozambique': 'MZ',
    'Myanmar': 'MM',
    'Namibia': 'NA',
    'Nauru': 'NR',
    'Nepal': 'NP',
    'Netherlands': 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    'Nicaragua': 'NI',
    'Niger': 'NE',
    'Nigeria': 'NG',
    'Niue': 'NU',
    'Norfolk Island': 'NF',
    'Northern Mariana Islands': 'MP',
    'Norway': 'NO',
    'Oman': 'OM',
    'Pakistan': 'PK',
    'Palau': 'PW',
    'Palestinian Territory, Occupied': 'PS',
    'Panama': 'PA',
    'Papua New Guinea': 'PG',
    'Paraguay': 'PY',
    'Peru': 'PE',
    'Philippines': 'PH',
    'Pitcairn': 'PN',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Puerto Rico': 'PR',
    'Qatar': 'QA',
    'Reunion': 'RE',
    'Romania': 'RO',
    'Russian Federation': 'RU',
    'Rwanda': 'RW',
    'Saint Barthelemy': 'BL',
    'Saint Helena': 'SH',
    'Saint Kitts And Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin': 'MF',
    'Saint Pierre And Miquelon': 'PM',
    'Saint Vincent And Grenadines': 'VC',
    'Samoa': 'WS',
    'San Marino': 'SM',
    'Sao Tome And Principe': 'ST',
    'Saudi Arabia': 'SA',
    'Senegal': 'SN',
    'Serbia': 'RS',
    'Seychelles': 'SC',
    'Sierra Leone': 'SL',
    'Singapore': 'SG',
    'Slovakia': 'SK',
    'Slovenia': 'SI',
    'Solomon Islands': 'SB',
    'Somalia': 'SO',
    'South Africa': 'ZA',
    'South Georgia And Sandwich Isl.': 'GS',
    'Spain': 'ES',
    'Sri Lanka': 'LK',
    'Sudan': 'SD',
    'Suriname': 'SR',
    'Svalbard And Jan Mayen': 'SJ',
    'Swaziland': 'SZ',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Syrian Arab Republic': 'SY',
    'Taiwan': 'TW',
    'Tajikistan': 'TJ',
    'Tanzania': 'TZ',
    'Thailand': 'TH',
    'Timor-Leste': 'TL',
    'Togo': 'TG',
    'Tokelau': 'TK',
    'Tonga': 'TO',
    'Trinidad And Tobago': 'TT',
    'Tunisia': 'TN',
    'Turkey': 'TR',
    'Turkmenistan': 'TM',
    'Turks And Caicos Islands': 'TC',
    'Tuvalu': 'TV',
    'Uganda': 'UG',
    'Ukraine': 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Outlying Islands': 'UM',
    'Uruguay': 'UY',
    'Uzbekistan': 'UZ',
    'Vanuatu': 'VU',
    'Venezuela': 'VE',
    'Vietnam': 'VN',
    'Virgin Islands, British': 'VG',
    'Virgin Islands, U.S.': 'VI',
    'Wallis And Futuna': 'WF',
    'Western Sahara': 'EH',
    'Yemen': 'YE',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW'
  };
</script>
<style scoped>
</style>
