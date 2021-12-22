// Define an object containing information about yourself. The object needs to include 'name',
//'address', 'emails', 'interests' and 'education'. The 'education' key needs to be an array of
//objects containing keys 'name' and 'enrolledDate'.
//-
// Using the object defined previously iterate over the 'education' key and print a list of output in
//the console as follows:
// Name: ABC School of Schoolery, Date: 2000
// Name: BCD School of Trickery, Date: 2006

let stud = {
  name: "lion",
  address: "kathmandu",
  emails: "shres@gmail.com",
  interests: "history",
  education: [
    {
      name: "Kathmandu University",
      enrolledDate: 2013,
    },
    { name: "ABC School of Schoolery", enrolledDate: 2006 },
  ],
};

let disp = [];
stud.education.forEach((c) => {
  disp.push({ Name: c.name, Date: c.enrolledDate });
});

console.log(disp);
