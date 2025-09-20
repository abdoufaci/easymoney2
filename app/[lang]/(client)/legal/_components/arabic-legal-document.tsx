"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ArabicLegalDocuments() {
  return (
    <div className="min-h-screen" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold  mb-2">Easy Money University</h1>
          <p>الوثائق القانونية والسياسات</p>
        </div>

        {/* Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-end">
              <FileText className="h-5 w-5" />
              الشروط والأحكام
            </CardTitle>
            <CardDescription className="text-right">
              تاريخ السريان: 2025-7-23 | آخر تحديث: 2025-7-23
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none text-right">
              {/* Terms and Conditions in Arabic */}
              <div className="mb-12">
                <h1 className="text-3xl font-bold mb-6  border-b-2 border-slate-200 pb-2 text-right">
                  ✅ الشروط والأحكام – منصة Easy Money University
                </h1>

                <div className="mb-6 p-4 bg-slate-900 rounded-lg">
                  <p className="text-lg leading-relaxed">
                    تحكم هذه الشروط والأحكام (&quot;الشروط&quot;) استخدامك لموقع
                    Easy Money University الإلكتروني، وتطبيقه على الهاتف
                    (&quot;التطبيق&quot;)، وجميع الخدمات المرتبطة به (ويشار
                    إليها مجتمعة بـ &quot;المنصة&quot;).
                  </p>
                  <p className="text-lg leading-relaxed mt-3">
                    بمجرد استخدام أي جزء من المنصة، بما في ذلك شراء الدورات أو
                    خطة المتابعة، أو الوصول إلى أي محتوى، فإنك توافق على
                    الالتزام بهذه الشروط.
                  </p>
                  <p className="text-lg leading-relaxed mt-3 font-semibold">
                    إذا لم توافق على الشروط، يُرجى التوقف فوراً عن استخدام
                    المنصة.
                  </p>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  1. نظرة عامة على المنصة
                </h2>
                <ul className="list-disc pr-6 mb-4 space-y-2 text-right">
                  <li>
                    <strong>الموقع الإلكتروني:</strong> متاح على
                    www.easy-money-university.com، ويوفر إمكانية تصفح الدورات،
                    شراء الخطط، التحقق من الهوية، والوصول إلى الدعم الفني.
                  </li>
                  <li>
                    <strong>التطبيق (Easy Money Follow-Up):</strong> مخصص فقط
                    للمستخدمين الذين اشتروا خطة المتابعة من الموقع الرسمي. يوفر
                    محتوى يومي خاص ودردشة خاصة مع المدرب. التطبيق لا يدعم عمليات
                    الدفع أو تصفح الدورات أو التحقق من الهوية.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  2. الأهلية والتسجيل
                </h2>
                <p className="mb-2 text-right">
                  <strong>2.1.</strong> يجب أن يكون عمرك 18 سنة على الأقل
                  لاستخدام المنصة.
                </p>
                <p className="mb-2 text-right">
                  <strong>2.2.</strong> يجب تقديم معلومات دقيقة وكاملة أثناء
                  التسجيل.
                </p>
                <p className="mb-2 text-right">
                  <strong>2.3.</strong> يتوجب على مستخدمي الموقع رفع بطاقة تعريف
                  سارية ومقروءة.
                </p>
                <p className="mb-4 text-right">
                  <strong>2.4.</strong> لا يطلب التطبيق أي تحقق من الهوية أو
                  وثائق شخصية.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  3. الوصول والتراخيص
                </h2>
                <p className="mb-2 text-right">
                  <strong>3.1.</strong> الوصول إلى المنصة شخصي وغير قابل
                  للتحويل.
                </p>
                <p className="mb-2 text-right">
                  <strong>3.2.</strong> يتم تزويد المستخدم بمعلومات الدخول بعد
                  إتمام الدفع عبر الموقع.
                </p>
                <p className="mb-4 text-right">
                  <strong>3.3.</strong> يُمنح المستخدم ترخيصاً محدوداً وغير حصري
                  وقابلاً للإلغاء لاستخدام المنصة لأغراض تعليمية شخصية فقط.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  4. استخدام التطبيق
                </h2>
                <p className="mb-2 text-right">
                  <strong>4.1.</strong> التطبيق متاح فقط للمستخدمين الذين اشتروا
                  خطة المتابعة عبر الموقع الرسمي.
                </p>
                <p className="mb-2 text-right">
                  <strong>4.2.</strong> يحتوي التطبيق على:
                </p>
                <ul className="list-disc pr-6 mb-4 space-y-1 text-right">
                  <li>
                    قناة متابعة حصرية تحتوي على منشورات يومية (رسائل صوتية،
                    فيديوهات، صور شاشة، ملفات PDF).
                  </li>
                  <li>
                    دردشة خاصة مع المدرب (قراءة منشورات فقط + إمكانية التواصل
                    المباشر في الدردشة).
                  </li>
                </ul>
                <p className="mb-4 text-right">
                  <strong>4.3.</strong> التطبيق لا يحتوي على: الدفع، تصفح
                  الدورات، أو رفع الوثائق. جميع هذه الوظائف تتم عبر الموقع.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  5. الدفع وتفعيل الوصول
                </h2>
                <p className="mb-2 text-right">
                  <strong>5.1.</strong> تتم جميع عمليات الشراء عبر الموقع
                  الإلكتروني.
                </p>
                <p className="mb-2 text-right">
                  <strong>5.2.</strong> طرق الدفع المتاحة: العملات الرقمية أو
                  عبر دعم المنصة.
                </p>
                <p className="mb-2 text-right">
                  <strong>5.3.</strong> يتم تفعيل الوصول يدوياً خلال يوم عمل
                  واحد من تأكيد الدفع.
                </p>
                <p className="mb-4 text-right">
                  <strong>5.4.</strong> يجب اجتياز الدورات بالتسلسل (مثال: لا
                  يمكنك شراء الدورة الثانية دون إكمال الأولى).
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  6. سياسة الاسترجاع
                </h2>
                <p className="mb-2 text-right">
                  <strong>6.1.</strong> جميع المبيعات نهائية بمجرد تفعيل الوصول
                  – لا توجد استرجاعات.
                </p>
                <p className="mb-2 text-right">
                  <strong>6.2.</strong> قد نمنح استرداداً جزئياً أو كاملاً فقط
                  في حالات الأعطال التقنية المثبتة، وبحسب تقديرنا الخاص.
                </p>
                <p className="mb-4 text-right">
                  <strong>6.3.</strong> يجب إرسال طلبات الاسترجاع خلال 24 ساعة
                  من تفعيل الوصول.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  7. السلوك المسموح والمحظور
                </h2>
                <p className="mb-2 text-right">
                  <strong>7.1.</strong> يُمنع تماماً:
                </p>
                <ul className="list-disc pr-6 mb-4 space-y-1 text-right">
                  <li>مشاركة بيانات الدخول مع الآخرين.</li>
                  <li>تحميل أو تسجيل أو إعادة نشر أي محتوى.</li>
                  <li>محاولة تعديل أو فك شيفرة التطبيق أو المنصة.</li>
                  <li>استخدام المنصة لأغراض غير قانونية.</li>
                </ul>
                <p className="mb-4 text-right">
                  <strong>7.2.</strong> يستخدم التطبيق تقنيات لمنع لقطات الشاشة
                  وتسجيل الشاشة، وأي محاولة لتجاوز هذه الحماية ممنوعة.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  8. ملكية المحتوى
                </h2>
                <p className="mb-2 text-right">
                  <strong>8.1.</strong> جميع المحتويات (نصوص، صور، فيديو، صوت،
                  تصميم، شعارات) مملوكة حصرياً لـ Easy Money University.
                </p>
                <p className="mb-4 text-right">
                  <strong>8.2.</strong> لا يجوز إعادة استخدام أو إعادة توزيع أو
                  إعادة نشر أي محتوى بدون إذن كتابي مسبق.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  9. إيقاف الحساب أو إنهاؤه
                </h2>
                <p className="mb-2 text-right">
                  <strong>9.1.</strong> نحتفظ بحق تعليق أو إنهاء حسابك دون
                  استرجاع، في حال:
                </p>
                <ul className="list-disc pr-6 mb-4 space-y-1 text-right">
                  <li>مخالفة هذه الشروط.</li>
                  <li>مشاركة المحتوى أو الحساب.</li>
                  <li>إساءة استخدام المنصة.</li>
                </ul>
                <p className="mb-4 text-right">
                  <strong>9.2.</strong> في حال الإنهاء، يتم إلغاء الترخيص
                  الممنوح لك فوراً.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  10. إخلاء المسؤولية
                </h2>
                <p className="mb-2 text-right">
                  <strong>10.1.</strong> المحتوى التعليمي مقدم لأغراض معرفية
                  فقط، ولا نضمن تحقيق أي أرباح مالية.
                </p>
                <p className="mb-4 text-right">
                  <strong>10.2.</strong> يتم تقديم المنصة كما هي، دون أي ضمانات
                  صريحة أو ضمنية.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  11. تحديد المسؤولية
                </h2>
                <p className="mb-2 text-right">
                  <strong>11.1.</strong> لسنا مسؤولين عن أي أضرار غير مباشرة أو
                  عرضية أو تبعية.
                </p>
                <p className="mb-4 text-right">
                  <strong>11.2.</strong> أقصى مسؤولية مالية نتحملها لا تتجاوز
                  المبلغ الذي دفعته خلال آخر 6 أشهر.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  12. التعويض
                </h2>
                <p className="mb-4 text-right">
                  توافق على تعويض Easy Money University وحمايتها من أي مطالبات
                  أو خسائر أو نفقات ناتجة عن مخالفتك لهذه الشروط أو إساءة
                  استخدامك للمنصة.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  13. التعديلات على الشروط
                </h2>
                <p className="mb-4 text-right">
                  قد نقوم بتحديث هذه الشروط في أي وقت. استمرارك في استخدام
                  المنصة بعد التحديث يُعتبر موافقة على الشروط الجديدة.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  14. القانون المعمول به
                </h2>
                <p className="mb-4 text-right">
                  تخضع هذه الشروط لقوانين الجمهورية الجزائرية، وتُحل أي نزاعات
                  أمام محاكم الجزائر العاصمة.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-right">
                  15. التواصل معنا
                </h2>
                <p className="mb-2 text-right">للاستفسارات أو الدعم:</p>
                <ul className="list-disc pr-6 mb-4 space-y-1 text-right">
                  <li>
                    <strong>البريد الإلكتروني:</strong>{" "}
                    easymoneysupport@gmail.com
                  </li>
                  <li>
                    <strong>الموقع الرسمي:</strong>{" "}
                    www.easy-money-university.com
                  </li>
                  <li>
                    <strong>صفحة الدعم:</strong>{" "}
                    www.easy-money-university.com/support
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
