<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
class MainController extends AbstractController
{
    /* Page d'accueil */
    public function index()
    {
        return $this->render("public/homepage.html.twig");
    }

    /* Listing des pages */
    public function listing()
    {
        return $this->render("listing.html.twig");
    }

    /* Categories */
    public function categories()
    {
        return $this->render("public/categories.html.twig");
    }

    /* Connexion */
    public function connexion()
    {
        return $this->render("public/connexion.html.twig");
    }

    /* Mot de passe oublié */
    public function mdpOublie()
    {
        return $this->render("public/mdpOublie.html.twig");
    }

    /* Mot de passe oublié */
    public function parametres()
    {
        return $this->render("public/parametres.html.twig");
    }

    /* USER • Dashboard */
    public function userDashboard()
    {
        return $this->render("member/userDashboard.html.twig");
    }

    /* USER • Search */
    public function userSearch()
    {
        return $this->render("member/userSearch.html.twig");
    }

    /* USER • Articles Récents */
    public function userLastArticles()
    {
        return $this->render("member/userLastArticles.html.twig");
    }

    /* USER • Collections */
    public function userCollections()
    {
        return $this->render("member/userCollections.html.twig");
    }

    /* BLOGGER • Dashboard */
    public function bloggerDashboard()
    {
        return $this->render("blogger/bloggerDashboard.html.twig");
    }

    /* BLOGGER • Preview */
    public function bloggerPreview()
    {
        return $this->render("blogger/bloggerPreview.html.twig");
    }
}