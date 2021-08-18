import React from "react";
import {inject, observer} from "mobx-react";

const SVG = inject('userStore')(observer((props) => {
    return (<svg display="none" xmlns="http://www.w3.org/2000/svg">
        <symbol id="icon-vk" viewBox="0 0 25 15">
            <path
                d="M23.93 1.167h-4.004a.904.904 0 00-.796.476s-1.597 2.941-2.11 3.932c-1.38 2.665-2.274 1.828-2.274.591V1.902A1.344 1.344 0 0013.403.558h-3.01a2.411 2.411 0 00-2.131.99S9.79 1.3 9.79 3.36c0 .51.027 1.98.05 3.212a.888.888 0 01-1.548.614 26.21 26.21 0 01-3.04-5.53.843.843 0 00-.767-.49H.847A.618.618 0 00.263 2c1.105 3.03 5.863 12.552 11.294 12.552h2.286a.903.903 0 00.903-.903v-1.38a.888.888 0 011.495-.647l2.737 2.57c.245.231.57.36.907.36h3.593c1.733 0 1.733-1.203.788-2.133-.665-.655-3.064-3.184-3.064-3.184a1.24 1.24 0 01-.096-1.61c.776-1.021 2.044-2.692 2.582-3.408.736-.978 2.067-3.05.242-3.05z"
                fill="currentColor"/>
        </symbol>

        <symbol id="icon-instagram" viewBox="0 0 25 25">
            <path
                d="M12.842 6.475c-3.58 0-6.547 2.827-6.547 6.348s2.915 6.348 6.547 6.348c3.631 0 6.546-2.877 6.546-6.348 0-3.472-2.966-6.348-6.546-6.348zm0 10.415c-2.302 0-4.194-1.835-4.194-4.067s1.892-4.067 4.194-4.067c2.301 0 4.194 1.835 4.194 4.067s-1.893 4.067-4.194 4.067zM19.644 7.768c.82 0 1.483-.644 1.483-1.439 0-.794-.664-1.438-1.483-1.438-.82 0-1.483.644-1.483 1.438 0 .795.664 1.44 1.483 1.44z"
                fill="currentColor"
            />
            <path
                d="M23.48 2.608C22.15 1.268 20.258.574 18.11.574H7.573C3.123.574.157 3.451.157 7.766v10.167c0 2.132.716 3.968 2.148 5.307 1.381 1.29 3.223 1.934 5.32 1.934h10.433c2.2 0 4.041-.694 5.37-1.934 1.382-1.29 2.098-3.125 2.098-5.258V7.766c0-2.083-.716-3.869-2.046-5.158zm-.205 15.374c0 1.538-.562 2.778-1.483 3.62-.92.844-2.2 1.29-3.734 1.29H7.625c-1.535 0-2.813-.446-3.734-1.29-.92-.892-1.381-2.132-1.381-3.67V7.767c0-1.488.46-2.728 1.38-3.62.87-.844 2.2-1.29 3.735-1.29H18.16c1.534 0 2.813.446 3.733 1.339.87.892 1.381 2.132 1.381 3.57v10.217z"
                fill="currentColor"
            />
        </symbol>

        <symbol id="icon-telegram" viewBox="0 0 25 19">
            <path
                d="M21.477 1.828l-3.239 15.274c-.244 1.078-.881 1.347-1.787.839l-4.935-3.637-2.381 2.29c-.264.264-.484.484-.992.484l.355-5.026 9.146-8.265c.398-.354-.086-.55-.618-.196L5.72 10.71.85 9.187c-1.06-.33-1.078-1.059.22-1.567L20.111.285c.882-.33 1.654.196 1.366 1.543z"
                fill="currentColor"
            />
        </symbol>

        <symbol id="icon-youtube" viewBox="0 0 25 17">
            <path
                d="M24.769 3.43a3.382 3.382 0 00-3.08-3.067 99.7 99.7 0 00-8.167-.321c-4.171 0-7.32.17-9.356.33a3.383 3.383 0 00-3.099 3.071 54.261 54.261 0 00-.232 5.108c0 2.013.107 3.715.23 5.01a3.382 3.382 0 003.099 3.067c2.036.16 5.185.33 9.358.33 3.465 0 6.272-.164 8.166-.321a3.382 3.382 0 003.08-3.068c.125-1.305.233-3.025.233-5.07 0-2.044-.108-3.764-.232-5.068zM10.23 12.05V4.95l7.006 3.55-7.006 3.552z"
                fill="currentColor"
            />
        </symbol>


        <symbol id="icon-photocam" viewBox="0 0 32 32">
            <rect height="20" rx="5" stroke="white" strokeWidth="2" width="26" x="3" y="7"/>
            <path
                d="M11.8114 4.40345C12.0723 3.5685 12.8456 3 13.7204 3H18.2796C19.1544 3 19.9277 3.5685 20.1886 4.40345L21 7H11L11.8114 4.40345Z"
                fill="white">&gt;</path>
            <circle cx="16" cy="17" r="5" stroke="white" strokeWidth="2"/>
        </symbol>

        <symbol id="icon-pencil" viewBox="0 0 24 24">
            <path
                d="M4.28363 15.5735L13.4234 6.43374L17.6146 10.625L8.47484 19.7647C8.29454 19.945 8.05219 20.0496 7.79733 20.0571L7.82693 21.0567L7.79733 20.0571L3.87501 20.1733L3.99117 16.251C3.99872 15.9961 4.10333 15.7538 4.28363 15.5735Z"
                stroke="#101010" strokeWidth="2"/>
            <path
                d="M17.3125 10.9294L13.1212 6.7382L15.6876 4.1718C16.0782 3.78127 16.7113 3.78128 17.1019 4.1718L19.8789 6.94879C20.2694 7.33932 20.2694 7.97249 19.8789 8.36301L17.3125 10.9294Z"
                stroke="#101010" strokeWidth="2"/>
            <path d="M9 20L4 15V20H9Z" fill="#101010"/>
        </symbol>


        <symbol id="icon-social-link" viewBox="0 0 38 43">
            <path
                d="M34.2531 30.1867C27.9986 40.7364 16.0989 45.2396 7.6745 40.2451C-0.749927 35.2505 -2.50897 22.6494 3.74556 12.0998C10.0001 1.55018 21.8997 -2.9531 30.3242 2.04147C38.7486 7.03604 40.5076 19.6371 34.2531 30.1867Z"
                fill="#E0E2E7"/>
        </symbol>
        <symbol id='icon-course-arrow' viewBox="0 0 16 16">
            <path d="M16 7L12 11L12 3L16 7Z" fill="#101010"/>
            <rect x="1" y="6" width="11" height="2" fill="#101010"/>
            <circle cx="3" cy="7" r="3" fill="#101010"/>
            <circle cx="3" cy="7" r="1" fill="white"/>
        </symbol>

        <symbol id="icon-swipe" viewBox="0 0 128 128">
            <path
                d="M91.914,68.983,86.89,64.911a1.25,1.25,0,0,0-.393-1.143l-4.929-4.453,5.55-15.1a4.716,4.716,0,0,0-7.832-4.9,4.724,4.724,0,0,0-8.254,1.149L65.5,55.514,57.576,57.62a1.25,1.25,0,0,0-.852.777L52.812,69.044a8.953,8.953,0,0,0,2.217,9.375c2.177,1.865,1.6,3.759.29,7.222l-.977,2.644,0,.011a1.252,1.252,0,0,0,.743,1.606,1.7,1.7,0,0,0,.571.122c.425,0,.7-.278.992-.885l1.015-2.615c1.221-3.239,2.606-6.91-1-10a6.493,6.493,0,0,1-1.5-6.614l3.687-10.037,5.6-1.488-1.712,4.661a1.25,1.25,0,1,0,2.347.862l8.3-22.581a2.223,2.223,0,1,1,4.173,1.533l-7.6,20.679A1.25,1.25,0,1,0,72.3,64.4l8.3-22.582a2.223,2.223,0,0,1,4.173,1.534L75.409,68.827a1.25,1.25,0,1,0,2.347.862l1.852-5.041h0l1.029-2.8,3.556,3.212-3.229,8.789a1.25,1.25,0,1,0,2.347.862l2.684-7.3,3.65,2.959L84.937,83.174a4.921,4.921,0,0,1-3.4,3.071,9.625,9.625,0,0,0-6.543,6.114l-1.14,3.1a1.25,1.25,0,1,0,2.347.862l1.14-3.1a7.131,7.131,0,0,1,4.815-4.554,7.421,7.421,0,0,0,5.131-4.63L92.3,70.386A1.25,1.25,0,0,0,91.914,68.983Z"/>
            <path
                d="M39.891,38.545h21.2L58.039,41.6a1.25,1.25,0,1,0,1.768,1.768l5.188-5.188a1.25,1.25,0,0,0,0-1.768l-5.188-5.188a1.25,1.25,0,1,0-1.768,1.768l3.054,3.054h-21.2l3.054-3.054a1.25,1.25,0,0,0-1.768-1.768L35.99,36.412a1.25,1.25,0,0,0,0,1.768l5.188,5.188A1.25,1.25,0,0,0,42.945,41.6Z"/>
        </symbol>

        <symbol id="icon-swipe-2" viewBox="-9 0 436 436.238">
            <path
                d="m392.851562 161.238281h-.710937c-13.84375 0-25.0625 12.316407-25.0625 27.417969v20.601562c0 3.863282-3.136719 7-7 7-3.867187 0-7-3.136718-7-7v-38.042968c0-15.097656-11.121094-27.390625-24.964844-27.390625-13.917969 0-25.035156 12.289062-25.035156 27.390625v40.324218c0 3.863282-3.136719 7-7 7-3.867187 0-7-3.136718-7-7v-51.390624c0-15.101563-11.585937-26.910157-25.429687-26.910157h-.757813c-13.5 0-24.8125 11.199219-24.8125 25.789063v57.871094c0 3.867187-3.136719 7-7 7-3.867187 0-7-3.132813-7-7v-56.222657c0-.179687-.023437-.359375-.023437-.539062 0-.453125.023437-.902344.023437-1.347657v-131.398437c0-15.101563-11.402344-27.390625-25.238281-27.390625-13.839844 0-25.238282 12.277344-25.246094 27.371094l-.152344 217.871094c-.003906 2.957031-1.863281 5.59375-4.644531 6.585937-2.78125.996094-5.890625.136719-7.765625-2.148437l-26.015625-31.667969c-6.933594-8.6875-17.167969-14.101563-28.253906-14.949219-10.855469-.722656-21.519531 3.101562-29.449219 10.550781-.085938.078125-.175781.144531-.265625.21875l-5.363281 4.417969 90.347656 173.515625c14.316406 27.503906 41.386719 44.472656 70.644531 44.472656h104.261719c44.609375 0 80.941406-38.980469 80.984375-87.039062.023437-25.164063.050781-43.824219.070313-59.074219.050781-41.03125.070312-56.398438-.035157-101.5625-.035156-15.058594-11.296875-27.324219-25.105469-27.324219zm0 0"/>
            <path
                d="m267.078125 63.238281h106.097656l-20.300781 20.300781c-2.730469 2.734376-2.730469 7.164063 0 9.898438 2.734375 2.734375 7.167969 2.734375 9.902344 0l32.128906-32.125c2.730469-2.734375 2.730469-7.167969 0-9.902344l-32.128906-32.128906c-2.734375-2.734375-7.167969-2.734375-9.902344 0-2.730469 2.734375-2.730469 7.164062 0 9.898438l20.058594 20.058593h-105.855469c-3.867187 0-7 3.132813-7 7 0 3.867188 3.132813 7 7 7zm0 0"/>
            <path
                d="m23.902344 63.238281h105.175781c3.863281 0 7-3.132812 7-7 0-3.867187-3.136719-7-7-7h-104.941406l20.058593-20.058593c2.734376-2.734376 2.734376-7.167969 0-9.902344-2.734374-2.730469-7.164062-2.730469-9.898437 0l-32.128906 32.128906c-2.734375 2.734375-2.734375 7.167969 0 9.902344l32.128906 32.128906c2.734375 2.734375 7.164063 2.734375 9.898437 0 2.734376-2.734375 2.734376-7.164062 0-9.898438zm0 0"/>
        </symbol>

        <symbol id="icon-economy-banner" viewBox="0 0 104 56">
            <path
                d="M4.49991 13.1862C5.66227 9.25456 6.24345 7.28874 7.74079 6.1077C9.23813 4.92666 11.2853 4.81937 15.3795 4.6048L85.8691 0.910603C89.9633 0.696033 92.0104 0.588747 93.623 1.60681C95.2356 2.62486 96.0191 4.51917 97.586 8.30777L100.785 16.0433C102.659 20.572 103.595 22.8364 103.721 25.235C103.846 27.6335 103.152 29.9834 101.762 34.6832L99.389 42.7107C98.2267 46.6423 97.6455 48.6082 96.1481 49.7892C94.6508 50.9702 92.6037 51.0775 88.5094 51.2921L18.0199 54.9863C13.9256 55.2009 11.8785 55.3082 10.2659 54.2901C8.65333 53.272 7.86985 51.3777 6.30289 47.5891L3.1035 39.8536C1.2304 35.3249 0.293857 33.0605 0.168154 30.6619C0.0424499 28.2634 0.737174 25.9135 2.12662 21.2137L4.49991 13.1862Z"/>
        </symbol>

    </svg>)
}))

export default SVG;