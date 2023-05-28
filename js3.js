const [header, aside, main, footer] = [document.createElement("header"), document.createElement("aside"), document.createElement("main"), document.createElement("footer")];


const [header_h1, header_h2, header_section] = [document.createElement("h1"), document.createElement("h2"), document.createElement("section")];

const [header_section_form, header_section_form_label, header_section_form_input] = [document.createElement("form"), document.createElement("label"), document.createElement("input")];

header_section_form_label.setAttribute("for", "signIn");
header_section_form_input.setAttribute("type", "text");
header_section_form_input.setAttribute("id", "quickSignIn");
header_section_form_input.setAttribute("name", "quickSignIn");

header_h1.textContent = "DOM Customization Demo"
header_h2.textContent = "v1.0"
header_section_form_label.textContent = "Sign in!"


const [aside_h3, aside_ul] = [document.createElement("h3"), document.createElement("ul")];

const aside_ul_li = Array(10).fill().map(() => document.createElement("li"));

aside_h3.textContent = "This version includes:"

aside_ul_li[0].textContent = "A lot of loremshit"
aside_ul_li[1].textContent = "Eos totam vitae unde, laborum iure doloribus."
aside_ul_li[2].textContent = "Reprehenderit error porro sed tempora inventore incidunt."
aside_ul_li[3].textContent = "Totam non dignissimos dolore magnam illo sunt?"
aside_ul_li[4].textContent = "Hic, animi exercitationem repellendus praesentium corrupti voluptatibus!"
aside_ul_li[5].textContent = "Ipsam iure, provident mollitia itaque repellat dolores!"
aside_ul_li[6].textContent = "Ratione voluptate enim distinctio. Ipsa, labore velit."
aside_ul_li[7].textContent = "Accusantium repudiandae dicta vitae eos, provident delectus."
aside_ul_li[8].textContent = "Quod, assumenda impedit ipsa omnis unde perspiciatis!"
aside_ul_li[9].textContent = "Assumenda maiores, earum animi cupiditate commodi architecto."


const main_section = Array(2).fill().map(() => document.createElement("section"));

const main_section_h3 = [document.createElement("h3"), document.createElement("h3")]

const main_section_h3_a = [document.createElement("a"), document.createElement("a")]

const main_section_p = [[document.createElement("p"), document.createElement("p")], [document.createElement("p"), document.createElement("p"), document.createElement("p"), document.createElement("p")]]

for(let i = 0; i<main_section.length; i++){
   main_section_h3_a[i].setAttribute("href", "#")
}

main_section_h3_a[0].textContent = "Lorem ipsum dolor sit amet consectetur adipisicing."
main_section_h3_a[1].textContent = "Lorem ipsum dolor sit amet."

main_section_p[0][0].textContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, distinctio illum! Rem!"
main_section_p[0][1].textContent = "Ex eveniet autem, placeat repudiandae quasi molestias mollitia officiis incidunt corrupti architecto?"

main_section_p[1][0].textContent = "Molestias doloribus quam quasi nobis expedita eveniet a fugiat explicabo!"
main_section_p[1][1].textContent = "Veniam possimus rerum illum velit quaerat excepturi fugit quidem eum."
main_section_p[1][2].textContent = "Sapiente consequuntur optio veniam soluta ipsum possimus error, dicta obcaecati."
main_section_p[1][3].textContent = "Consectetur tempora molestiae voluptas perferendis placeat modi cupiditate cumque nulla."

const footer_small = document.createElement("small")

footer_small.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, consectetur perspiciatis velit pariatur itaque quos, iure alias commodi perferendis natus maxime ut fuga debitis rerum rem asperiores nostrum ad odit dolorem? Nostrum."


document.querySelector('body').appendChild(header)
header.appendChild(header_h1)
header.appendChild(header_h2)
header.appendChild(header_section)
header_section.appendChild(header_section_form)
header_section_form.appendChild(header_section_form_label)
header_section_form.appendChild(header_section_form_input)

document.querySelector('body').appendChild(aside)
aside.appendChild(aside_h3)
aside.appendChild(aside_ul)
for(let i = 0; i<aside_ul_li.length; i++){
   aside_ul.appendChild(aside_ul_li[i])
}

document.querySelector('body').appendChild(main)
for(let i = 0; i<main_section.length; i++){
   main.appendChild(main_section[i])
   main_section[i].appendChild(main_section_h3[i])
   main_section_h3[i].appendChild(main_section_h3_a[i])
   for(let j = 0; j<main_section_p[i].length; j++){
      main_section[i].appendChild(main_section_p[i][j])
   }
}

document.querySelector('body').appendChild(footer)
footer.appendChild(footer_small)