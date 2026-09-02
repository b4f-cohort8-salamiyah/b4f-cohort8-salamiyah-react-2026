<!-- @format -->

# B4F Cohort 8 — Salamiyah — React 2026

Student-facing repository for the React phase of B4F Cohort 8 (Salamiyah).

- `main` — protected, instructor-managed baseline
- `group-1` — Group 1 course branch (instructor publishes updates here)
- `group-2` — Group 2 course branch (instructor publishes updates here)
- `group-1-<student-slug>` / `group-2-<student-slug>` — individual student branches (created after enrollment)

Students: pull updates from your group branch into your own branch. Do not push directly to `main`, `group-1`, or `group-2`.

**New to Git/GitHub for this course, or need a refresher?** See the
[Git & GitHub Handbook](docs/GITHUB_HANDBOOK.md) — checking out your branch, getting group updates,
resolving conflicts, and pushing.
كجواب لسؤالك ماذا يجب ان نفعل كي نتفاعل مع الستيت الحالات ونصبح قادرين عللى التحويل الحال من قيد الانجاز لمكتملو او حذفها او ما شابه :
المشكلة الحالية التي تمنع حدوث اشياء تفعليه ان اصلا الستيت تحفظ ضمن مصفوفة معرفة بالشكل
const tasks: Task[] = [ ... ];

وطبعا همنا لا اقصد ان المشكلة ب const
فانني حتى لو وضعت بمتحولlet الامر لن يتغير

فالمشكلة انني ضمن ريأكت
React
لا يعيد بناء الشاشة لي
Re-render
حتى لو استطعت تغير القيمة في الخلفية
ولن يحدث التغير الاا في حال
إلا إذا تغيرت قيمة محفوظة داخل State

وومن ذلك نسنتنج اننا ك بداية بحاجة
نقوم بنقل المصفوفة من خارج المكون ونضعها بداخل الـ
Component
باستخدام الـ
Hook المسمى
useState،

const [searchText, setSearchText] = useState("");

وهيك عندما مريد القيام باي تغير لا نستدعي المصفوفة بل الدالة
setTasksState
ونمرر لها المصفوفة بعد التعديل
وهذا بشك مشابه ل
currentFilter
searchText
وهيك بصير فينا نتعامل معها من خلال تنفيذ توابع
مثل تابع التوغيل يلي استخدمناه باكتر من موقف
لتغير الحالة
ام توابع الدليت
وهيك الشرح العام وشكرا للاستماع استاذ نوارررررررررررررررررررررررررررررررررر الملك
