from django.shortcuts import render
from .models import Quiz
from django.views.generic import ListView
from django.http import JsonResponse, HttpResponseBadRequest
from questions.models import Question, Answer
from results.models import Result
from django.shortcuts import get_object_or_404

class QuizListView(ListView):
  model = Quiz
  template_name = 'quizes/main.html'

def quiz_view(request, pk):
  quiz = Quiz.objects.get(pk=pk)
  return render(request, 'quizes/quiz.html', {'obj': quiz})

def quiz_data_view(request, pk):
  quiz = Quiz.objects.get(pk=pk)
  questions = quiz.get_questions()
  answers_data = []
  for q in questions:
    answer_options = []
    for a in q.answer_set.all():
      answer_options.append(a.text)
    answers_data.append({str(q): answer_options})
  return JsonResponse({
    'data': answers_data,
    'time': quiz.time,
  })

def save_quiz_view(request, pk):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        print("AJAX request received.")
        questions = []
        data = request.POST
        data_ = dict(data.lists())
        
        data_.pop('csrfmiddlewaretoken', None)
        
        print("Data received:", data_)
        
        for k in data_.keys():
            question = get_object_or_404(Question, text=k)
            questions.append(question)
        
        user = request.user
        quiz = get_object_or_404(Quiz, pk=pk)
        
        score = 0
        multiplier = 100 / quiz.number_of_questions
        results = []
        
        for q in questions:
            a_selected = data.get(q.text)
            
            if a_selected is not None:
                question_answers = Answer.objects.filter(question=q)
                for a in question_answers:
                    if a_selected == a.text:
                        if a.correct:
                            score += 1
                            correct_answer = a.text
                    else:
                        if a.correct:
                            correct_answer = a.text
                
                results.append({str(q): {'correct_answer': correct_answer, 'answered': a_selected}})
            else:
                results.append({str(q): 'not answered'})
        
        score_ = score * multiplier
        Result.objects.create(quiz=quiz, user=user, score=score_)
        
        if score_ >= quiz.required_score_to_pass:
            return JsonResponse({'passed': True, 'score': score_, 'results': results})
        else:
            return JsonResponse({'passed': False, 'score': score_, 'results': results})
    else:
        return HttpResponseBadRequest("This is not an AJAX request")