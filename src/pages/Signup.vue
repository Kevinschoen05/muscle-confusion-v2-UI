<template>
    <section id="hero">
        <div class="hero-content">
            <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div class="text-center mb-5">
                    <div class="text-900 text-3xl font-medium mb-3">Create New Account</div>
                    <span class="text-600 font-medium line-height-3">Already have an account?</span>
                    <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                        @click="this.$router.push('/login')">Sign In!</a>
                </div>

                <div>
                    <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                    <InputText v-model="email" id="email1" type="text" class="w-full mb-3" />

                    <label for="username" class="block text-900 font-medium mb-2">Username</label>
                    <InputText v-model="userName" id="username1" type="text" class="w-full mb-3" />

                    <label for="password1" class="block text-900 font-medium mb-2">Password</label>
                    <InputText v-model="password" id="password1" type="password" class="w-full mb-3" />

                    <div class="flex align-items-center justify-content-between mb-6">
                        <div class="flex align-items-center">
                            <Checkbox id="rememberme1" :binary="true" class="mr-2"></Checkbox>
                            <label for="rememberme1">Remember me</label>
                        </div>
                    </div>

                    <Button @click="handleSubmit()" label="Sign In" icon="pi pi-user" class="w-full"></Button>
                </div>
            </div>
        </div>
        <picture>
            <img aria-hidden="true" decoding="async" src="../assets/hero-background.jpeg">
        </picture>
</section>
</template>

<script>
import API from '../api';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
            userName: ''
        }
    },
    methods: {

        async handleSubmit() {
            try {
                await this.$store.dispatch('signUp', {
                    email: this.email,
                    password: this.password
                })

                await this.$nextTick() // Wait for Vue to update the store
                await this.createUser()

                this.$router.push('/home')
            }
            catch (err) {
                this.error = err.message
            }


        },

        async createUser() {
            console.log('Calling createUser() function...')
            console.log("user ID: " + this.$store.state.user.uid, " " + "username" + this.userName)
            try {
                await API.initializeUser(this.$store.state.user.uid, this.userName)
                console.log('User created successfully')
            } catch (err) {
                console.error('Error creating user:', err)
            }
        }
    }


}

</script>
<style scoped>
#hero {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    z-index: 1;
    min-height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

#hero:before {
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: .7;
    top: 0;
    left: 0;
    z-index: -1;
}

#hero picture {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -2;
}

#hero picture img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}

#hero h1 {
    color: #fff;
    font-size: 2.13333333em;
    text-align: center;
    margin: 0 auto;
    position: relative;
    width: 96%;
    max-width: 7.8125em;
    margin-top: 1.09375em;
    margin-bottom: 0.46875em;
}

#hero p {
    color: #fff;
    text-align: center;
    max-width: 22.22222222em;
    margin: auto;
    margin-bottom: 1.66666667em;
    display: block;
    width: 96%;
}

.hero-content {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-content: center;
    align-items: center;
}
</style>